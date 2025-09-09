(function () {
if (typeof window.SwymStorefrontLayoutAPI === 'undefined') {
  window.SwymStorefrontLayoutAPI = {};
}
if (typeof window.SwymStorefrontLayoutContext === 'undefined') {
  window.SwymStorefrontLayoutContext = {};
}
if(typeof window.SwymStorefrontLayoutExtensions === 'undefined'){
  window.SwymStorefrontLayoutExtensions = {};
}

function isShopifyStoreRTLEnabled() {
  // Check dir attributes
  const htmlDir = document.documentElement.getAttribute('dir');
  const bodyDir = document.body.getAttribute('dir');

  // Check computed CSS direction
  const htmlCSSDir = getComputedStyle(document.documentElement).direction;
  const bodyCSSDir = getComputedStyle(document.body).direction;

  // Optional: check for common theme class
  const hasRTLClass = document.documentElement.classList.contains('rtl') || 
                      document.body.classList.contains('rtl') ||
                      document.querySelector('.rtl, .is-rtl') !== null;

  return (
    htmlDir === 'rtl' ||
    bodyDir === 'rtl' ||
    htmlCSSDir === 'rtl' ||
    bodyCSSDir === 'rtl' ||
    hasRTLClass
  );
}

const isRTL = isShopifyStoreRTLEnabled();
if (isRTL) {
  document.body.classList.add('swym-ccui-rtl');
}

SwymStorefrontLayoutContext.ActionTypes = {
  ManageListItem: 'ManageListItem',
  ManageSflListItem: 'ManageSflListItem',
  AddToCollection: 'AddToCollection',
  CreateCollection: 'CreateCollection',
  EditCollection: 'EditCollection',
  SaveCollection: 'SaveCollection',
  ShareSingleWishlist: 'ShareSingleWishlist'
}

SwymStorefrontLayoutContext.NotificationStatusTypes = {
  Success: 'success',
  Error: 'error',
  Warning: 'Warning',
  Info: 'info',
  Neutral: 'neutral',
  Toast: 'toast'
}

SwymStorefrontLayoutContext.NotificationActionTypes = {
  AddedToWishlist: 'added-to-wishlist',
  AddToCollection: 'add-to-collection',
  AddedToCollection: 'added-to-collection',
  AddedToCart: 'added-to-cart'
}

SwymStorefrontLayoutContext.StorefrontLayoutUrls = {
  List: '#swym-list',
  Collections: '#swym-collections',
  CollectionList: '#swym-collection:'
}

SwymStorefrontLayoutContext.NotificationIconType = {
  SuccessIcon: 'SuccessIcon',
  RemoveIcon: 'RemoveIcon'
}

SwymStorefrontLayoutContext.LoaderViewType = {
  WishlistListItem: 'wishlist-list-item',
  CarouselListItem: 'carousel-list-item',
  CollectionImages: 'collection-view-images',
  SpinnerLoader: 'spinner-loader'
}

SwymStorefrontLayoutContext.StorefrontLayoutViewType = {
  Wishlist: 'tabWishlist',
  SaveForLater: 'tabSavedForLater'
}

SwymStorefrontLayoutContext.Tabs = [SwymStorefrontLayoutContext.StorefrontLayoutViewType.Wishlist]

SwymStorefrontLayoutContext.ListItemType = {
  WishlistItem: 'WishlistItem',
  CollectionItem: 'CollectionItem',
  SaveForLaterItem: 'SaveForLaterItem'
}
SwymStorefrontLayoutContext.CommonAddtoWL = false;
SwymStorefrontLayoutContext.CommonRemovefromWL = false;
window._SwymAJAXCart = async function () {
  try {
    const cartComponent = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
    if (!cartComponent || typeof cartComponent.getSectionsToRender !== 'function') {
      console.warn('[Cart Refresh] Cart component or getSectionsToRender is missing.');
      const modalPopup = document.querySelector("modal-popup");
      if(modalPopup && window.routes.cart) {
        modalPopup.trigger("updateCart", {
            callback: () => {
                modalPopup.forwardEvent("openPopup", {
                    target: "CART",
                    url: window.routes.cart
                });
            }
        });
        return;
      } 
      
      // Get current theme info
      const currentThemeName = window?.Shopify?.theme?.schema_name?.trim();
      const currentThemeId = window?.Shopify?.theme?.theme_store_id;

      if (!currentThemeName) return false;

      // Use preset API to get theme event configuration
      window._swat.fetchThemePreset({ 
        themeStoreId: currentThemeId, 
        schemaName: currentThemeName
      }, (themeData) => {
        if (themeData?.AJAXCartEvent?.[0]?.eventName) {
          try {
            // Get event details from preset API response
            const event = themeData.AJAXCartEvent?.[0];
            
            // Create event config object only with defined properties
            const eventConfig = {};
            if (event.bubbles !== undefined) {
              eventConfig.bubbles = event.bubbles;
            }
            if (event.detail !== undefined) {
              eventConfig.detail = event.detail;
            }
            
            // Create and dispatch custom event with only defined properties
            const customEvent = new CustomEvent(event?.eventName, eventConfig);

            // Dispatch event on appropriate target
            const target = event.bubbles ? document.documentElement : document;
            target.dispatchEvent(customEvent);
          } catch (err) {
            console.warn(`[Cart Refresh] Failed to dispatch event for theme ${currentThemeName}`, err);
          }
        }
      });
      return;
    }
    
    const sectionsToRender = cartComponent.getSectionsToRender();
    const sectionIds = sectionsToRender.map(section => section.id).join(',');
    if (!sectionIds) {
      console.warn('[Cart Refresh] No section IDs found to render.');
      return;
    }

    const [sectionRes, cartDataRes] = await Promise.all([
      fetch(`/?sections=${sectionIds}`).then(res => res.ok ? res.json() : Promise.reject('Failed to fetch sections')),
      fetch('/cart.js').then(res => res.ok ? res.json() : Promise.reject('Failed to fetch cart data'))
    ]);

    const parser = new DOMParser();

    // Update cart icon bubble
    const cartIconBubble = document.getElementById('cart-icon-bubble');
    const iconHtmlDoc = parser.parseFromString(sectionRes['cart-icon-bubble'], 'text/html');
    const iconBubbleContent = iconHtmlDoc.getElementById('shopify-section-cart-icon-bubble')?.innerHTML;
    if (cartIconBubble && iconBubbleContent) {
      cartIconBubble.innerHTML = iconBubbleContent;
    }

    // Update cart drawer if it exists
    const cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer) {
      const drawerHtmlDoc = parser.parseFromString(sectionRes['cart-drawer'], 'text/html');
      const newDrawerContent = drawerHtmlDoc.querySelector('cart-drawer')?.innerHTML;

      if (newDrawerContent !== undefined) {
        cartDrawer.classList.toggle('is-empty', cartDataRes.item_count === 0);
        cartDrawer.innerHTML = newDrawerContent;

        const overlay = cartDrawer.querySelector('#CartDrawer-Overlay');
        if (overlay) {
        overlay.addEventListener('click', cartDrawer.close?.bind(cartDrawer));
        }
      }
    }
  } catch (error) {
      console.error('[Cart Refresh] An error occurred:', error);
  }
};

/**
 * Checks if the current user has permission to edit the given wishlist.
 * @param {Object} list - The wishlist to check.
 * @returns {boolean} - Returns true if the user can edit the list, otherwise false.
 */
SwymStorefrontLayoutContext.checkUserCanEditList = (list) => {
  if(!list){
      window._swat?.utils.warn('list not exist to check list access');
    return false;
  }
  if(list?.lty === 'sfl'){
    let canEditList = SwymStorefrontLayoutContext?.sflList?.lid === list?.lid;
    return canEditList;
  }
  let canEditList = SwymStorefrontLayoutContext?.lists?.some((userList)=> userList?.lid === list?.lid);
  return canEditList;
}

/**
 * Formats a given price based on the store's money formatting settings.
 * @param {number} value - The price value to format.
 * @returns {string} - The formatted price string.
 */
SwymStorefrontLayoutContext.FormatPrice = (value) => {
  try {
    if (window.SwymOverrideFormatMoneyFn) {
      return window.SwymOverrideFormatMoneyFn(value);
    }
    if (window._swat.platform.formatMoney) {
      if (
          window._swat.platform.currentMoneyFormat &&
          window._swat.platform.currentMoneyFormat()
      ) {
        return window._swat.platform.formatMoney(
          value,
          window._swat.platform.currentMoneyFormat()
        );
      }
    }
  } catch (err) {
    window._swat?.utils.error("Error formatting price - " + value + err);
  }
  const currency = window._swat.currency;
  return currency + window._swat.utils.padDecimal(value);
}


/**
 * Retrieves the selected variant from a given item based on the provided variant ID.
 *
 * @param {Object} item - The item containing product data and variants.
 * @param {string | number} variantId - The ID of the variant to find.
 * @returns {Object | null} - The matching variant object if found, otherwise null.
 */
SwymStorefrontLayoutContext.getSelectedVariant = (item, variantId) => {
  return variantId? item?.productData?.variants?.find((variant) => variant?.id === variantId) || null:null;
}

/**
 * Calculates the difference in hours between the current time and a given date-time string.
 * @param {number} hours - The threshold hours to compare.
 * @param {string} dateTimeString - The stored date-time string.
 * @returns {boolean} - Returns true if the time difference exceeds the given hours, otherwise false.
 */
SwymStorefrontLayoutExtensions.calcDifferenceInHours = (hours, dateTimeString) => {
  try {
    if (!dateTimeString) {
      window._swat?.utils.warn("[WARNING] Date time string empty");
      return;
    }
    const storedDateTime = new Date(dateTimeString?.trim());
    const currentDateTime = new Date();

    const differenceInMs = Math.abs(currentDateTime - storedDateTime);
    const differenceInHours = differenceInMs / (1000 * 60 * 60);
    return differenceInHours > hours;
  } catch (error) {
    window._swat?.utils.warn("[Error/Warning] while performing health check", error);
    return false;
  }
}


/**
 * Checks if a given container has a scrollbar and applies/removes a CSS class accordingly.
 * @param {HTMLElement} container - The container element to check.
 */
SwymStorefrontLayoutExtensions.checkContainerScrollbar = (container) => {
  try{
    if(!container){
      window._swat?.utils.warn("container not available for scrollbar check");
      return;
    }
    if (container.scrollHeight > container.clientHeight) {
      container.classList.add("swym-storefront-layout-container-has-scroll");
    } else {
      container.classList.remove("swym-storefront-layout-container-has-scroll");
    }
  }catch(error){
    window._swat?.utils.warn("invalid container for scrollbar check");
  }
}

SwymStorefrontLayoutExtensions.refreshWishList = () => {
  try {
    SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.updateList();
  } catch (error) {
    window._swat?.utils.error('Failed to fetch wishlist', error);
  }
}

SwymStorefrontLayoutExtensions.refreshSFLList = () => {
  try {
    SwymStorefrontLayoutAPI?.SwymSFLAsyncApis?.updateSflList();
  } catch (error) {
    window._swat?.utils.error('Failed to fetch sfl list', error);
  }
}

/**
 * Defines action codes for various storefront layout events.
 */
SwymStorefrontLayoutExtensions.InstrumentActionCodes = {
  StorefrontLayoutInitialized: 701,
  StorefrontLayoutOpened: 702,
  StorefrontLayoutClosed: 703,
  StorefrontLayoutUserLogIn: 704,
  StorefrontLayoutCollectionRendered: 705,
  StorefrontLayoutWishlistItemsRendered: 706,
  StorefrontLayoutVariantChanged: 707,
  StorefrontLayoutItemAddedToCart: 708,
  StorefrontLayoutItemAddedToList: 709,
  StorefrontLayoutItemRemovedFromList: 710,
  StorefrontLayoutCollectionCreated: 711,
  StorefrontLayoutCollectionOpened: 712,
  StorefrontLayoutCollectionRenamed: 713,
  StorefrontLayoutCollectionDeleted: 714,
  StorefrontLayoutCollectionGridViewOpened: 715,
  StorefrontLayoutSFLInitialized: 716,
  StorefrontLayoutSFLItemsRendered: 717,
  StorefrontLayoutSFLItemAddedToList: 718,
  StorefrontLayoutSFLItemRemovedFromList: 719,
  StorefrontLayoutSFLItemMovedToCart: 720,
  StorefrontLayoutPageRendered: 721,
  StorefrontLayoutModalRendered: 722,
  StorefrontLayoutSideDrawerRendered: 723
};

/**
 * Defines UTM terms for tracking user engagement and interactions.
 */
SwymStorefrontLayoutExtensions.InstrumentUtmTerms = {
  StorefrontLayoutUiEngagement: "storefront_layout_ui_engagement",
  StorefrontLayoutCollectionInteractions: "storefront_layout_collection_interactions",
  StorefrontLayoutItemInteractions: "storefront_layout_item_interactions",
  StorefrontLayoutCartConversion: "storefront_layout_cart_conversion"
};


/**
 * SwymWishlistCore Component
 *
 * This component serves as the base class for Swym Wishlist Storefront Layout, 
 * providing the core functionality shared across different layout implementations:
 * - Drawer
 * - Page Section
 * - Modal
 *
 * Key Responsibilities:
 * - Initializes the UI and sets up event listeners for wishlist interactions.
 * - Handles fetching and rendering of wishlist items and collections.
 * - Monitors hash changes to update the UI accordingly.
 * - Integrates with Swym's API for wishlist actions and notifications.
 * - Provides a structured foundation for extending different storefront layout types.
 *
 * The component can be extended by specific layout implementations such as:
 * - `SwymStorefrontLayoutAsDrawer`
 * - `SwymStorefrontLayoutAsPageSection`
 * - `SwymStorefrontLayoutAsModal`
 */
class SwymWishlistCore extends HTMLElement {
  constructor() {
    super();
    this.elements = {};
    this.initUi();
  }

  initUi(){
    this.setAttribute('id', 'swym-storefront-layout');
    window.addEventListener('hashchange', ()=>{
      this.checkForSwymDrawerHash();
    });

    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.LayoutInitialized, () => {
      SwymStorefrontLayoutContext?.swat.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutInitialized, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
      this.checkForSwymDrawerHash();
      this.initElement();
      SwymStorefrontLayoutContext?.swat.evtLayer.addEventListener(SwymStorefrontLayoutContext?.swat.JSEvents.StringsLoaded, (event) => {
        this.loadStrings();
      });
      this.attachSwymEventListeners(SwymStorefrontLayoutContext.swat);
      this.instrumentLayoutType();
    });

    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.WishlistFetched, () => {
      this.checkForSwymDrawerHash();
    })
  }

  instrumentLayoutType(){
    let StorefrontLayoutType = SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutType;
    if(StorefrontLayoutType === 'as-drawer'){
      SwymStorefrontLayoutContext?.swat.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutSideDrawerRendered, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
    }else if(StorefrontLayoutType === 'as-modal'){
      SwymStorefrontLayoutContext?.swat.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutModalRendered, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
    }else if(StorefrontLayoutType === 'as-section'){
      SwymStorefrontLayoutContext?.swat.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutPageRendered, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
    }
  }

  reRenderStorefrontLayoutUI() {
    this.reRenderUI();
    this.initElement();
  }

  initElement(){

    SwymStorefrontLayoutExtensions.SwymStorefrontLayout = document.querySelector('swym-storefront-layout #swym-storefront-layout');
    SwymStorefrontLayoutExtensions.SwymStorefrontLayoutActions = document.querySelector('#swym-storefront-layout-actions') || document.querySelector('#swym-storefront-layout-actions-target-page');
    SwymStorefrontLayoutExtensions.SwymStorefrontLayoutActionTooltip = document.querySelector('#swym-storefront-layout-action-tooltip') || document.querySelector('#swym-storefront-layout-action-tooltip-target-page');
    SwymStorefrontLayoutExtensions.Notification = document.querySelector('swym-storefront-layout-notification');
    SwymStorefrontLayoutExtensions.collectionsListComponent = document.querySelector('swym-storefront-layout-collection-list');

  }

  loadStrings() {
    try {
      const RetailerStrings = window._swat?.retailerSettings?.Strings || {};
      const {
        ThemeAppStorefrontLayoutTitle,

        ThemeAppStorefrontLayoutAddToCartCTA,
        ThemeAppStorefrontLayoutAddedToCartCTA,
        ThemeAppStorefrontLayoutAddingToCartCTA,
        ThemeAppStorefrontLayoutSoldoutCTA,
        ThemeAppStorefrontLayoutViewCartCTA,
        ThemeAppStorefrontLayoutMoveToCartCTA,
        ThemeAppStorefrontLayoutMoveingToCartCTA,
        ThemeAppStorefrontLayoutRemoveSFLItemCTA,

        ThemeAppStorefrontLayoutLoginHeading,
        ThemeAppStorefrontLayoutLoginMessage,
        ThemeAppStorefrontLayoutLoginButtonCTA,
        ThemeAppStorefrontLayoutLoggedUserWelcomeMessage,

        ThemeAppStorefrontLayoutWishlistTitle,
        ThemeAppStorefrontLayoutWishlistInfo,
        ThemeAppStorefrontLayoutEmptyWishlistTitle,
        ThemeAppStorefrontLayoutEmptyWishlistDescription,

        ThemeAppStorefrontLayoutCollectionsTitle,
        ThemeAppStorefrontLayoutEmptyCarouselCollectionsDescription,
        ThemeAppStorefrontLayoutEmptyCollectionsTitle,
        ThemeAppStorefrontLayoutEmptyCollectionsDescription,

        ThemeAppStorefrontLayoutAddToCollectionsTitle,
        ThemeAppStorefrontLayoutAddToCollectionCTA,
        ThemeAppStorefrontLayoutCreateCollectionCTA,
        ThemeAppStorefrontLayoutSaveNewCollectionCTA,
        ThemeAppStorefrontLayoutRemoveItemCTA,
        ThemeAppStorefrontLayoutRenameCollectionCTA,
        ThemeAppStorefrontLayoutDeleteCollectionCTA,
        ThemeAppStorefrontLayoutShareCollectionCTA,
        ThemeAppStorefrontLayoutSaveCollectionCTA,
        ThemeAppStorefrontLayoutEditCollectionCTA,
        ThemeAppStorefrontLayoutShareCollectionTitle,
        ThemeAppStorefrontLayoutShareCollectionMessage,
        ThemeAppStorefrontLayoutSharedCollectionMessage,
        ThemeAppStorefrontLayoutUpdateCollectionTitle,

        ThemeAppStorefrontLayoutErrorMessageListNameRequired,
        ThemeAppStorefrontLayoutErrorMessageListNameRequired3Char,
        ThemeAppStorefrontLayoutErrorMessageListNameAlreadyExist,

        ThemeAppStorefrontLayoutNotificationMessageItemSaved,
        ThemeAppStorefrontLayoutNotificationMessageItemRemoved,
        ThemeAppStorefrontLayoutNotificationMessageAddedToCart,
        ThemeAppStorefrontLayoutNotificationMessageAddedToCollection,
        ThemeAppStorefrontLayoutNotificationMessageCollectionSaved,
        ThemeAppStorefrontLayoutNotificationMessageCollectionDeleted,
        ThemeAppStorefrontLayoutNotificationMessageCollectionUpdated,
        ThemeAppStorefrontLayoutNotificationMessageCollectionUnavailable,
        ThemeAppStorefrontLayoutNotificationMessageSFLItemSaved,
        ThemeAppStorefrontLayoutNotificationMessageSFLItemRemoved,
        ThemeAppStorefrontLayoutNotificationMessageMovedToCart,

        ThemeAppStorefrontLayoutNotificationActionAddToCollection,
        ThemeAppStorefrontLayoutNotificationActionView,
        ThemeAppStorefrontLayoutNotificationActionViewCollection,
        ThemeAppStorefrontLayoutNotificationActionGoToCart,

        ThemeAppStorefrontLayoutTextItem,
        ThemeAppStorefrontLayoutTextItems,

        ThemeAppStorefrontLayoutTabWishlist,
        ThemeAppStorefrontLayoutTabSavedForLater,
        ThemeAppStorefrontLayoutSaveForLaterTitle,
        ThemeAppStorefrontLayoutEmptySavedForLaterTitle,
        ThemeAppStorefrontLayoutEmptySavedForLaterDescription,
        VariantSelectorBtnText
      } = RetailerStrings;

      SwymStorefrontLayoutContext.Strings = {
        ...SwymStorefrontLayoutContext?.Strings,
        ...(ThemeAppStorefrontLayoutTitle ? { 'title': ThemeAppStorefrontLayoutTitle } : {}),
        ...(VariantSelectorBtnText ? { 'VariantSelectorBtnText': VariantSelectorBtnText } : {}),
        ...(ThemeAppStorefrontLayoutAddToCartCTA ? { 'addToCart': ThemeAppStorefrontLayoutAddToCartCTA } : {}),
        ...(ThemeAppStorefrontLayoutAddedToCartCTA ? { 'addedToCart': ThemeAppStorefrontLayoutAddedToCartCTA } : {}),
        ...(ThemeAppStorefrontLayoutAddingToCartCTA ? { 'addingToCart': ThemeAppStorefrontLayoutAddingToCartCTA } : {}),
        ...(ThemeAppStorefrontLayoutSoldoutCTA ? { 'soldOut': ThemeAppStorefrontLayoutSoldoutCTA } : {}),
        ...(ThemeAppStorefrontLayoutViewCartCTA ? { 'viewCartCta': ThemeAppStorefrontLayoutViewCartCTA } : {}),
        ...(ThemeAppStorefrontLayoutMoveToCartCTA ? { 'moveToCartCta': ThemeAppStorefrontLayoutMoveToCartCTA } : {}),
        ...(ThemeAppStorefrontLayoutMoveingToCartCTA ? { 'movingToCartCta': ThemeAppStorefrontLayoutMoveingToCartCTA } : {}),
        ...(ThemeAppStorefrontLayoutRemoveSFLItemCTA ? { 'removeSflItemCta': ThemeAppStorefrontLayoutRemoveSFLItemCTA } : {}),

        ...(ThemeAppStorefrontLayoutLoginHeading ? { 'loginHeading': ThemeAppStorefrontLayoutLoginHeading } : {}),
        ...(ThemeAppStorefrontLayoutLoginMessage ? { 'loginText': ThemeAppStorefrontLayoutLoginMessage } : {}),
        ...(ThemeAppStorefrontLayoutLoginButtonCTA ? { 'loginButtonText': ThemeAppStorefrontLayoutLoginButtonCTA } : {}),
        ...(ThemeAppStorefrontLayoutLoggedUserWelcomeMessage ? { 'loggedUserWelcomeMessage': ThemeAppStorefrontLayoutLoggedUserWelcomeMessage } : {}),

        ...(ThemeAppStorefrontLayoutWishlistTitle ? { 'wishlistTitle': ThemeAppStorefrontLayoutWishlistTitle } : {}),
        ...(ThemeAppStorefrontLayoutWishlistInfo ? { 'wishlistInfo': ThemeAppStorefrontLayoutWishlistInfo } : {}),
        ...(ThemeAppStorefrontLayoutEmptyWishlistTitle ? { 'emptyWishlistTitle': ThemeAppStorefrontLayoutEmptyWishlistTitle } : {}),
        ...(ThemeAppStorefrontLayoutEmptyWishlistDescription ? { 'emptyWishlistDescription': ThemeAppStorefrontLayoutEmptyWishlistDescription } : {}),

        ...(ThemeAppStorefrontLayoutCollectionsTitle ? { 'collectionTitle': ThemeAppStorefrontLayoutCollectionsTitle } : {}),
        ...(ThemeAppStorefrontLayoutEmptyCarouselCollectionsDescription ? { 'emptyCarouselCollectionText': ThemeAppStorefrontLayoutEmptyCarouselCollectionsDescription } : {}),
        ...(ThemeAppStorefrontLayoutEmptyCollectionsTitle ? { 'emptyCollectionText': ThemeAppStorefrontLayoutEmptyCollectionsTitle } : {}),
        ...(ThemeAppStorefrontLayoutEmptyCollectionsDescription ? { 'emptyCollectionDescription': ThemeAppStorefrontLayoutEmptyCollectionsDescription } : {}),

        ...(ThemeAppStorefrontLayoutAddToCollectionsTitle ? { 'addToCollectionTitle': ThemeAppStorefrontLayoutAddToCollectionsTitle } : {}),
        ...(ThemeAppStorefrontLayoutAddToCollectionCTA ? { 'addToCollectionCta': ThemeAppStorefrontLayoutAddToCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutCreateCollectionCTA ? { 'createCollectionCta': ThemeAppStorefrontLayoutCreateCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutSaveNewCollectionCTA ? { 'saveNewCollectionCta': ThemeAppStorefrontLayoutSaveNewCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutRemoveItemCTA ? { 'removeItemCta': ThemeAppStorefrontLayoutRemoveItemCTA } : {}),
        ...(ThemeAppStorefrontLayoutRenameCollectionCTA ? { 'renameCollectionCta': ThemeAppStorefrontLayoutRenameCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutDeleteCollectionCTA ? { 'deleteCollectionCta': ThemeAppStorefrontLayoutDeleteCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutShareCollectionCTA ? { 'shareCollectionCta': ThemeAppStorefrontLayoutShareCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutSaveCollectionCTA ? { 'saveCollectionCta': ThemeAppStorefrontLayoutSaveCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutEditCollectionCTA ? { 'editCollectionCta': ThemeAppStorefrontLayoutEditCollectionCTA } : {}),
        ...(ThemeAppStorefrontLayoutShareCollectionTitle ? { 'shareCollectionTitle': ThemeAppStorefrontLayoutShareCollectionTitle } : {}),
        ...(ThemeAppStorefrontLayoutShareCollectionMessage ? { 'shareCollectionMessage': ThemeAppStorefrontLayoutShareCollectionMessage } : {}),
        ...(ThemeAppStorefrontLayoutSharedCollectionMessage ? { 'sharedCollectionMessage': ThemeAppStorefrontLayoutSharedCollectionMessage } : {}),
        ...(ThemeAppStorefrontLayoutUpdateCollectionTitle ? { 'updateCollectionTitle': ThemeAppStorefrontLayoutUpdateCollectionTitle } : {}),

        ...(ThemeAppStorefrontLayoutErrorMessageListNameRequired ? { 'errorMessageListNameRequired': ThemeAppStorefrontLayoutErrorMessageListNameRequired } : {}),
        ...(ThemeAppStorefrontLayoutErrorMessageListNameRequired3Char ? { 'errorMessageListNameRequire3Char': ThemeAppStorefrontLayoutErrorMessageListNameRequired3Char } : {}),
        ...(ThemeAppStorefrontLayoutErrorMessageListNameAlreadyExist ? { 'errorMessageListNameAlreadyExist': ThemeAppStorefrontLayoutErrorMessageListNameAlreadyExist } : {}),

        ...(ThemeAppStorefrontLayoutNotificationMessageItemSaved ? { 'notificationMessageItemSaved': ThemeAppStorefrontLayoutNotificationMessageItemSaved } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageItemRemoved ? { 'notificationMessageItemRemoved': ThemeAppStorefrontLayoutNotificationMessageItemRemoved } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageAddedToCart ? { 'notificationMessageAddedToCart': ThemeAppStorefrontLayoutNotificationMessageAddedToCart } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageAddedToCollection ? { 'notificationMessageAddedToCollection': ThemeAppStorefrontLayoutNotificationMessageAddedToCollection } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageCollectionSaved ? { 'notificationMessageCollectionSaved': ThemeAppStorefrontLayoutNotificationMessageCollectionSaved } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageCollectionDeleted ? { 'notificationMessageCollectionDeleted': ThemeAppStorefrontLayoutNotificationMessageCollectionDeleted } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageCollectionUpdated ? { 'notificationMessageCollectionUpdated': ThemeAppStorefrontLayoutNotificationMessageCollectionUpdated } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageCollectionUnavailable ? { 'notificationMessageCollectionUnavailable': ThemeAppStorefrontLayoutNotificationMessageCollectionUnavailable } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageSFLItemSaved ? { 'notificationMessageSFLItemSaved': ThemeAppStorefrontLayoutNotificationMessageSFLItemSaved } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageSFLItemRemoved ? { 'notificationMessageSFLItemRemoved': ThemeAppStorefrontLayoutNotificationMessageSFLItemRemoved } : {}),
        ...(ThemeAppStorefrontLayoutNotificationMessageMovedToCart ? { 'notificationMessageMovedToCart': ThemeAppStorefrontLayoutNotificationMessageMovedToCart } : {}),
        
        ...(ThemeAppStorefrontLayoutNotificationActionAddToCollection ? { 'notificationActionAddToCollection': ThemeAppStorefrontLayoutNotificationActionAddToCollection } : {}),
        ...(ThemeAppStorefrontLayoutNotificationActionView ? { 'notificationActionView': ThemeAppStorefrontLayoutNotificationActionView } : {}),
        ...(ThemeAppStorefrontLayoutNotificationActionViewCollection ? { 'notificationActionViewCollection': ThemeAppStorefrontLayoutNotificationActionViewCollection } : {}),
        ...(ThemeAppStorefrontLayoutNotificationActionGoToCart ? { 'notificationActionGoToCart': ThemeAppStorefrontLayoutNotificationActionGoToCart } : {}),

        ...(ThemeAppStorefrontLayoutTextItem ? { 'item': ThemeAppStorefrontLayoutTextItem } : {}),
        ...(ThemeAppStorefrontLayoutTextItems ? { 'items': ThemeAppStorefrontLayoutTextItems } : {}),
        
        ...(ThemeAppStorefrontLayoutTabWishlist ? { 'tabWishlist': ThemeAppStorefrontLayoutTabWishlist } : {}),
        ...(ThemeAppStorefrontLayoutTabSavedForLater ? { 'tabSavedForLater': ThemeAppStorefrontLayoutTabSavedForLater } : {}),
        ...(ThemeAppStorefrontLayoutSaveForLaterTitle ? { 'savedForLaterTitle': ThemeAppStorefrontLayoutSaveForLaterTitle } : {}),
        ...(ThemeAppStorefrontLayoutEmptySavedForLaterTitle ? { 'emptySavedForLaterTitle': ThemeAppStorefrontLayoutEmptySavedForLaterTitle } : {}),
        ...(ThemeAppStorefrontLayoutEmptySavedForLaterDescription ? { 'emptySavedForLaterDescription': ThemeAppStorefrontLayoutEmptySavedForLaterDescription } : {}),
      }
      this.reRenderStorefrontLayoutUI();
    } catch (error) {
      window._swat?.utils.error(error);
    }
  }

  async checkForSwymDrawerHash() {
    const { StorefrontLayoutType, StorefrontLayoutAsSectionPageURL } = SwymStorefrontLayoutContext?.Settings;
    const currentHash = window.location.hash;

    if(!SwymStorefrontLayoutExtensions.SwymStorefrontLayout){
      SwymStorefrontLayoutExtensions.SwymStorefrontLayout = document.querySelector('swym-storefront-layout #swym-storefront-layout');
    }

    if(!currentHash && SwymStorefrontLayoutExtensions.SwymStorefrontLayout?.isOpen){
      SwymStorefrontLayoutExtensions.SwymStorefrontLayout?.close();
      return;
    }

    const openWishlistPage = () => {
        if (StorefrontLayoutType === 'as-drawer' || StorefrontLayoutType === 'as-modal') {
            SwymStorefrontLayoutExtensions?.SwymStorefrontLayout?.open();
        } else if (StorefrontLayoutType === 'as-section' && window.location.pathname !== StorefrontLayoutAsSectionPageURL) {
          const locale = window.Shopify.routes.root
          const formattedLocale = locale === '/' ? '' : locale.replace(/\/$/, '')
          window.location = `${window.location.origin}${formattedLocale}${StorefrontLayoutAsSectionPageURL}`;
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    };

    if (currentHash === SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.List) {
      SwymStorefrontLayoutExtensions?.collectionsListComponent?.closeCollectinListView();
        openWishlistPage();
    } else if (currentHash.startsWith(SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.CollectionList)) {
        const collectionId = currentHash.slice(SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.CollectionList.length);

        if (collectionId && SwymStorefrontLayoutContext?.collections) {
            const selectedCollection = SwymStorefrontLayoutContext?.collections?.find(collection => collection.lid === collectionId);

            if (selectedCollection) {
              SwymStorefrontLayoutExtensions?.collectionsListComponent?.setData({
                list: selectedCollection,
                collections: SwymStorefrontLayoutContext?.collections
              });
              SwymStorefrontLayoutExtensions?.collectionsListComponent?.openCollectionListView();
            } else {
              try{
                const sharedListDetails = await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.fetchListDetails(collectionId);
                if(sharedListDetails?.list){
                  let [list] = await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.fetchProductDataForLists([sharedListDetails.list], true) || [];
                  if(list){
                    SwymStorefrontLayoutExtensions?.collectionsListComponent?.setData({
                      list,
                      collections: SwymStorefrontLayoutContext?.collections
                    });
                    SwymStorefrontLayoutExtensions?.collectionsListComponent?.openCollectionListView();
                  }else{
                    throw 'Failed to get product data for shared list';
                  }
                }else{
                  throw 'Collection Not Available';
                }
              }catch(e){
                SwymStorefrontLayoutExtensions?.Notification?.setMessage({
                  message: SwymStorefrontLayoutContext?.Strings?.notificationMessageCollectionUnavailable,
                  status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Error,
                  duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration
                });
                window._swat?.utils.error(`Collection detail not found for ID: ${collectionId}. It may have been deleted or is unavailable.`,e);
              }
            }

            openWishlistPage();
        }
    }
  }

    /**
   * Attaches event listeners to Swym's event layer for handling various storefront layout interactions.
   * 
   * Key Features:
   * - Refreshes the wishlist and save-for-later (SFL) lists when customer information is updated.
   * - Handles events for adding and removing items from the wishlist and SFL.
   * - Displays notifications for user actions such as adding to wishlist, removing items, or moving items to the cart.
   * - Tracks user interactions using Swym's instrumentation for analytics.
   * - Supports multi-list and collection features based on retailer settings.
   * 
   * Events Handled:
   * - `customerInfoRefreshed`: Refreshes wishlist and SFL lists.
   * - `addedToWishlist`: Updates the wishlist and displays a notification when an item is added.
   * - `removedFromWishlist`: Updates the wishlist and displays a notification when an item is removed.
   * - `addedToSFL`: Updates the SFL list and displays a notification when an item is added.
   * - `removedFromSFL`: Updates the SFL list and displays a notification when an item is removed.
   * - `movedToCartFromSFL`: Refreshes the SFL list when an item is moved to the cart.
   * 
   * Dependencies:
   * - SwymStorefrontLayoutExtensions: Provides methods for refreshing lists and managing notifications.
   * - SwymStorefrontLayoutContext: Provides context for settings, strings, and instrumentation codes.
   * - Swym's event layer (`swat.evtLayer`): Listens for and triggers events.
   */
  
  attachSwymEventListeners(swat) {

    swat?.evtLayer?.addEventListener(swat?.JSEvents?.customerInfoRefreshed, ()=>{
      SwymStorefrontLayoutExtensions?.refreshWishList();
      if(window._swat?.retailerSettings?.SFL?.SFLFeatureEnabled){
        SwymStorefrontLayoutExtensions?.refreshSFLList();
      }
    })

    //Wishlist Events 
    swat?.evtLayer?.addEventListener(swat?.JSEvents?.addedToWishlist, (event) => {
      const isMultiListEnabled = swat.retailerSettings?.Wishlist?.EnableCollections;
      SwymStorefrontLayoutExtensions?.refreshWishList();

      let image = event?.detail?.d?.iu || null;
      let { epi, empi } = event?.detail?.d || {};
      let product = event?.detail.d;
      
      swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutItemAddedToList, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutItemInteractions, epi, empi });
        if(SwymStorefrontLayoutContext?.swat?.ui?.uiRef?.settings?.UI?.WishlistShowNotification && !SwymStorefrontLayoutContext.CommonAddtoWL){
          SwymStorefrontLayoutExtensions?.Notification?.setMessage({
            message: SwymStorefrontLayoutContext?.Strings?.notificationMessageItemSaved,
            status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
            actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToWishlist,
            duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
            product,
            image
          },{
            showImage: true,
            showProgress: true
          });
    
          setTimeout(()=>{
            // FIXME - remove repetative code once testing is done
            const isOldControlCentre = !('multiple-wishlist' in (window?.SwymEnabledCommonFeatures || {}));
            // Determine the boolean condition based on whether it's the old or new control centre
            const shouldAddToCollection = isOldControlCentre
                ? SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection // For old control centre, use this setting
                : window?.SwymEnabledCommonFeatures?.['multiple-wishlist']; // For new control centre, use this feature flag                
                if(SwymStorefrontLayoutExtensions?.Notification?.notificationData?.actionType === SwymStorefrontLayoutContext?.NotificationActionTypes?.AddedToWishlist){
                  SwymStorefrontLayoutExtensions?.Notification?.setMessage({
                    status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
                    actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToWishlist,
                    duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
                    product,
                    image,
                    action: {
                        label: shouldAddToCollection ? SwymStorefrontLayoutContext?.Strings?.notificationActionAddToCollection:  SwymStorefrontLayoutContext?.Strings?.notificationActionView,
                        onClick: () => {
                          if(shouldAddToCollection){
                            SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutPageActions?.setData({
                              listId: SwymStorefrontLayoutContext?.DefaultList?.lid,
                              list: SwymStorefrontLayoutContext?.DefaultList,
                              item: product,
                              collections: SwymStorefrontLayoutContext?.collections,
                              actionType: SwymStorefrontLayoutContext?.ActionTypes.AddToCollection
                            });
                            SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutPageActions?.openDrawer();
                          }else{
                            window.location.hash = SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.List; 
                          }
                        }
                    }
                  },{
                    showImage: true,
                    showActionButton: true,
                    showTitle: true
                  });
                }
          },3000);
        }
      if(SwymStorefrontLayoutContext.CommonAddtoWL && !SwymStorefrontLayoutContext.CommonRemovefromWL) {
        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
            message: SwymStorefrontLayoutContext?.Strings?.notificationMessageItemSaved,
            status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
            actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToWishlist,
            duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
            product,
            image
          },{
            showImage: true,
            showProgress: true
          });
        SwymStorefrontLayoutContext.CommonAddtoWL = false  

        setTimeout(() => {
          SwymStorefrontLayoutExtensions?.Notification?.setMessage({
                    status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
                    actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToWishlist,
                    duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
                    product,
                    image,
                    action: {
                        label: SwymStorefrontLayoutContext?.Strings?.notificationActionView,
                        onClick: () => {
                         _swat.ui.open();
                        }
                    }
                  },{
                    showImage: true,
                    showActionButton: true,
                    showTitle: true
                  });
        }, 3000)
      }
    });

    swat?.evtLayer?.addEventListener(swat?.JSEvents?.removedFromWishlist, (event) => {

      let image = event?.detail?.d?.iu || null;
      let { epi, empi } = event?.detail?.d || {};
      const product = event?.detail.d;
      if( epi && empi){
        SwymStorefrontLayoutExtensions?.refreshWishList();
          swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutItemRemovedFromList, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutItemInteractions, epi, empi }); 
      }
      if((SwymStorefrontLayoutContext.CommonRemovefromWL && SwymStorefrontLayoutContext.CommonAddtoWL) || SwymStorefrontLayoutContext.CommonRemovefromWL) {
          if(SwymStorefrontLayoutContext.CommonRemovefromWL && !SwymStorefrontLayoutContext.CommonAddtoWL) {
            SwymStorefrontLayoutExtensions?.Notification?.setMessage({
              message: SwymStorefrontLayoutContext?.Strings?.notificationMessageItemRemoved,
              status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Toast,
              duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
              image
            });        
            SwymStorefrontLayoutContext.CommonRemovefromWL = false;
            setTimeout(() => {
              SwymStorefrontLayoutExtensions?.Notification?.setMessage({
                status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
                actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToWishlist,
                duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
                product,
                image,
                action: {
                    label: SwymStorefrontLayoutContext?.Strings?.notificationActionView,
                    onClick: () => {
                    _swat.ui.open();
                    }
                }
              },{
                showImage: true,
                showActionButton: true,
                showTitle: true
              });
            }, 3000)
        }
        return
      }
      SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          message: SwymStorefrontLayoutContext?.Strings?.notificationMessageItemRemoved,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Toast,
          duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
          image
        });
    });

    //SFL Events 
    if(window._swat?.retailerSettings?.SFL?.SFLFeatureEnabled){
      swat.evtLayer.addEventListener(swat.JSEvents.addedToSFL, (event) => {
        let image = event?.detail?.d?.iu || null;
        let title = event?.detail?.d?.dt || null;
        let { epi, empi } = event?.detail?.d || {};
        window._swat.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutSFLItemAddedToList, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutItemInteractions, epi, empi });
        
        SwymStorefrontLayoutExtensions?.refreshSFLList();

        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          message: SwymStorefrontLayoutContext?.Strings?.notificationMessageSFLItemSaved,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
          duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
          image,
          title
        },{
          showProgress: true,
          showTitle: true
        });
      });

      swat.evtLayer.addEventListener(swat.JSEvents.removedFromSFL, (event) => {
        let image = event?.detail?.d?.iu || null;
        let title = event?.detail?.d?.dt || null;
        let { epi, empi } = event?.detail?.d || {};
        window._swat.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutSFLItemRemovedFromList, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutItemInteractions, epi, empi });
        SwymStorefrontLayoutExtensions?.refreshSFLList();

        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          message: SwymStorefrontLayoutContext?.Strings?.notificationMessageSFLItemRemoved,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
          duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
          image,
          title
        },{
          showProgress: true,
          showTitle: true
        });
      });

      swat.evtLayer.addEventListener(swat.JSEvents.movedToCartFromSFL, (event) => {
        swat.utils.debounce(()=>{
          SwymStorefrontLayoutExtensions?.refreshSFLList();
        }, 1000)();
      });

    }
  }

}

/**
 * SwymStorefrontLayoutAsModal
 * 
 * This class extends SwymWishlistCore to render a modal-based storefront layout for the Swym wishlist.
 * It manages UI rendering, event listeners, and open/close interactions.
 * 
 * Features:
 * - Displays a modal layout for wishlist functionality.
 * - Supports collection carousel based on SwymStorefrontLayoutContext settings.
 * - Provides a close button and backdrop click handling to close the modal.
 * - Tracks UI engagement using Swym's instrumentation.
 * 
 * Methods:
 * - renderUI(): Generates the modal's HTML structure.
 * - initUIElement(): Initializes UI elements and event listeners.
 * - attachDrawerEventListner(): Binds click events to close the modal.
 * - open(): Opens the modal and updates the UI state.
 * - close(): Closes the modal, removes body scroll lock, and updates history state.
 * - reRenderUI(): Re-renders the UI while preserving the open state.
 * 
 * Usage:
 * <swym-storefront-layout-as-modal></swym-storefront-layout-as-modal>
 */
  class SwymStorefrontLayoutAsModal extends SwymWishlistCore {
    constructor() {
      super();
      this.renderUI();
    }

    renderUI() {
      this.innerHTML = `
      <div id="swym-storefront-layout-container" class="swym-storefront-layout-drawer swym-storefront-layout-hide-view" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="swym-modal-title">
        <div class="swym-storefront-layout-backdrop"></div>
        <div class="swym-storefront-layout-layout">
          <swym-storefront-layout-tabs></swym-storefront-layout-tabs>
          <button id="swym-storefront-layout-close-drawer-button" aria-label="Close" class="swym-storefront-layout-close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="white"/>
              <path d="M13.9697 15.0303C14.2626 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697L11.0607 10L15.0303 6.03033C15.3232 5.73744 15.3232 5.26256 15.0303 4.96967C14.7374 4.67678 14.2626 4.67678 13.9697 4.96967L10 8.93934L6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L8.93934 10L4.96967 13.9697C4.67678 14.2626 4.67678 14.7374 4.96967 15.0303C5.26256 15.3232 5.73744 15.3232 6.03033 15.0303L10 11.0607L13.9697 15.0303Z" fill="#4A4A4A"/>
            </svg>
          </button>
          <swym-storefront-layout-tab-content class="swym-storefront-layout-container swym-storefront-layout-scrollable"></swym-storefront-layout-tab-content>
          <swym-storefront-layout-login-user showLogin="true"></swym-storefront-layout-login-user>
        </div>
      </div>
    `;

      this.initUIElement();
    }

  initUIElement() {
    this.elements = {
      drawer: this.querySelector('.swym-storefront-layout-drawer'),
      drawerCloseButton: this.querySelector('#swym-storefront-layout-close-drawer-button'),
      drawerbackdrop: this.querySelector('.swym-storefront-layout-backdrop'),
      collectionList: this.querySelector('#swym-storefront-layout-collection-list'),
    }


    this.attachDrawerEventListner();

  }

    getDeepFocusableElements(root) {
      const focusableSelector =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      let elements = Array.from(root.querySelectorAll(focusableSelector));
      for (const el of elements) {
        if (el.shadowRoot) {
          elements = elements.concat(
            this.getDeepFocusableElements(el.shadowRoot)
          );
        }
      }
      return elements;
    }

    trapFocus = (e) => {
      const isTabPressed = e.key === "Tab" || e.keyCode === 9;
      if (!isTabPressed) return;

      const modal = this.elements.drawer;
      const focusableElements = this.getDeepFocusableElements(modal);

      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (
          document.activeElement === first ||
          !modal.contains(document.activeElement)
        ) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (
          document.activeElement === last ||
          !modal.contains(document.activeElement)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    attachDrawerEventListner() {
      this.elements.drawerCloseButton.addEventListener('click', this.close.bind(this));
      this.elements.drawerbackdrop.addEventListener('click', this.close.bind(this));
    }

    open() {
      this.isOpen = true;
      this.previouslyFocused = document.activeElement;

      if (this.elements?.drawer) {
        this.elements.drawer.classList.remove(
          "swym-storefront-layout-hide-view"
        );
        document.body.classList.add("swym-storefront-layout-body-no-scroll");

        this.elements.drawer.focus();
        document.addEventListener("keydown", this.trapFocus, true);
        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutOpened, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
      }
    }

    close() {
      this.isOpen = false;

      if (this.elements?.drawer) {
        this.elements.drawer.classList.add("swym-storefront-layout-hide-view");
        document.body.classList.remove("swym-storefront-layout-body-no-scroll");

        document.removeEventListener("keydown", this.trapFocus, true);

        if (this.previouslyFocused && typeof this.previouslyFocused.focus === "function") {
          this.previouslyFocused.focus();
        }

        history.replaceState(null, '', window.location.pathname + window.location.search);
        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutClosed, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
      }
    }

    reRenderUI() {
      this.renderUI();
      if (this.isOpen) this.open();
    }
  }

/**
 * SwymStorefrontLayoutAsSection
 * 
 * This class extends SwymWishlistCore to render a storefront wishlist layout as a section within a specified container.
 * It dynamically injects the wishlist UI into the provided container element.
 * 
 * Features:
 * - Renders the wishlist section inside a container specified by the `container-id` attribute.
 * - Supports collection carousel based on SwymStorefrontLayoutContext settings.
 * - Displays wishlist items and user login UI.
 * - Handles rendering errors gracefully and logs warnings if an invalid container ID is provided.
 * 
 * Methods:
 * - renderUI(): Generates the section-based wishlist UI and injects it into the specified container.
 * - reRenderUI(): Re-renders the UI to reflect any updates.
 * 
 * Usage:
 * <swym-storefront-layout-as-section container-id="your-container-id"></swym-storefront-layout-as-section>
 */

class SwymStorefrontLayoutAsSection extends SwymWishlistCore {
  constructor() {
    super();
    this.containerId = this.getAttribute('container-id');
    this.renderUI();
  }

  renderUI() {
    let { StorefrontLayoutType } = SwymStorefrontLayoutContext?.Settings;
    if(StorefrontLayoutType === 'as-section'){
      this.listContainerToRender = null;
      try {
        this.listContainerToRender = document.getElementById(this.containerId);

        this.listContainerToRender.innerHTML = `
        <div id="swym-storefront-layout-container">
          <div id="swym-storefront-layout-section-container" class="swym-storefront-layout-layout">
            <swym-storefront-layout-tabs></swym-storefront-layout-tabs>
            <swym-storefront-layout-login-user showLogin="true"></swym-storefront-layout-login-user>
            <swym-storefront-layout-tab-content class="swym-storefront-layout-container"></swym-storefront-layout-tab-content>
          </div>
        </div>
        `

        this.listContainerToRender.classList.add('swym-storefront-layout-root-component');

      } catch (error) {
        window._swat?.utils.warn('Invalid List Container Selector ', this.containerId);
      }
    }
  }

  reRenderUI() {
    this.renderUI();
  }

}

/**
 * SwymStorefrontLayoutAsDrawer
 * 
 * This class extends SwymWishlistCore to implement a drawer-style storefront wishlist layout.
 * It provides an interactive UI for users to view and manage their wishlist within a side drawer.
 * 
 * Features:
 * - Renders a wishlist drawer that slides in/out based on user interaction.
 * - Supports collection carousel display based on SwymStorefrontLayoutContext settings.
 * - Includes login UI for authentication-related actions.
 * - Implements event listeners for closing the drawer via a close button or backdrop click.
 * - Triggers instrumentation events for UI engagement tracking.
 * 
 * Methods:
 * - renderUI(): Generates the wishlist drawer UI and injects it into the component.
 * - initUIElement(): Caches DOM elements required for interactions.
 * - attachDrawerEventListner(): Attaches event listeners for closing the drawer.
 * - open(): Opens the drawer and prevents background scrolling.
 * - close(): Closes the drawer, restores scrolling, and updates browser history.
 * - reRenderUI(): Re-renders the UI and retains the open state if applicable.
 * 
 * Usage:
 * <swym-storefront-layout-as-drawer></swym-storefront-layout-as-drawer>
 */
  class SwymStorefrontLayoutAsDrawer extends SwymWishlistCore {
    constructor() {
      super();
      this.renderUI();
    }

    renderUI() {
      this.innerHTML = `
      <div id="swym-storefront-layout-container" class="swym-storefront-layout-drawer swym-storefront-layout-hide-view swym-storefront-layout-drawer-position-${SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutDrawerPosition}" role="dialog" aria-modal="true" aria-labelledby="swym-side-drawer-title" tabindex="-1">
        <div class="swym-storefront-layout-backdrop"></div>
        <div class="swym-storefront-layout-layout">
          <button id="swym-storefront-layout-close-drawer-button" aria-label="Close" class="swym-storefront-layout-close-button">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="base-icon close-icon" aria-hidden="true">
              <path d="m10.536 1.5-9 9M1.536 1.5l9 9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </button>
          <swym-storefront-layout-tab-content class="swym-storefront-layout-container swym-storefront-layout-scrollable"></swym-storefront-layout-tab-content>
          <swym-storefront-layout-login-user showLogin="true"></swym-storefront-layout-login-user>
          <swym-storefront-layout-actions id="swym-storefront-layout-actions"></swym-storefront-layout-actions>
          <swym-storefront-layout-tabs></swym-storefront-layout-tabs>
        </div>
      </div>
    `;
      this.initUIElement();
    }

    initUIElement() {
      this.elements = {
        drawer: this.querySelector('.swym-storefront-layout-drawer'),
        drawerCloseButton: this.querySelector('#swym-storefront-layout-close-drawer-button'),
        drawerbackdrop: this.querySelector('.swym-storefront-layout-backdrop'),
        collectionList: this.querySelector('#swym-storefront-layout-collection-list')
      }
      this.attachDrawerEventListner();
    }

    attachDrawerEventListner() {
      this.elements.drawerCloseButton.addEventListener('click', this.close.bind(this));
      this.elements.drawerbackdrop.addEventListener('click', this.close.bind(this));
    }

    getFocusableElements(root) {
      const selectors =
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      const elements = Array.from(root.querySelectorAll(selectors));

      return elements.filter(
        (el) => el.offsetParent !== null || el instanceof SVGElement
      );
    }

    trapFocus = (e) => {
      if (e.key !== "Tab") return;

      const focusableEls = this.getFocusableElements(this.elements.drawer);
      if (focusableEls.length === 0) return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !this.elements.drawer.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !this.elements.drawer.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    open() {
      this.isOpen = true;
      this.previouslyFocused = document.activeElement;

      if (this.elements?.drawer) {
        this.elements.drawer.classList.remove("swym-storefront-layout-hide-view");
        document.body.classList.add("swym-storefront-layout-body-no-scroll");

        // Set focus to the drawer itself
        this.elements.drawer.focus();

        // Trap focus inside the drawer
        document.addEventListener("keydown", this.trapFocus, true);

        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutOpened, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
      }
    }

    close() {
      this.isOpen = false;

      if (this.elements?.drawer) {
        this.elements.drawer.classList.add("swym-storefront-layout-hide-view");
        document.body.classList.remove("swym-storefront-layout-body-no-scroll");

        document.removeEventListener("keydown", this.trapFocus, true);

        // Return focus to the previously focused element
        if (this.previouslyFocused && typeof this.previouslyFocused.focus === "function") {
          this.previouslyFocused.focus();
        }

        history.replaceState(null, '', window.location.pathname + window.location.search);
        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutClosed, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
      }
    }

    reRenderUI() {
      this.renderUI();
      if (this.isOpen) this.open();
    }
  }

/**
 * SwymStorefrontLayoutCollectionCarousel
 * 
 * This custom Web Component is responsible for rendering a carousel of collection lists 
 * within the storefront layout. It dynamically updates based on the provided collection 
 * data and offers smooth scrolling functionality with navigation buttons.
 * 
 * Features:
 * - Dynamically renders collections with images and item counts.
 * - Implements smooth scrolling with previous/next buttons.
 * - Updates button visibility based on scroll position.
 * - Tracks user interactions using Swym's instrumentation.
 * - Provides an action button for each collection with a tooltip menu.
 * - Supports localization via `SwymStorefrontLayoutContext?.Strings`.
 * 
 * Usage:
 * - Call `setData({ collections })` to populate the carousel with collection data.
 * 
 * Dependencies:
 * - `window.SwymStorefrontLayoutContext` for localized strings and configurations.
 * - `window._swat?.instrumentV3` for tracking user interactions.
 * - `SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip` for managing action tooltips.
 * 
 */
class SwymStorefrontLayoutCollectionCarousel extends HTMLElement {
  constructor() {
    super();
    this.collections = [];
    this.renderUI();
    this.elements = {
      title: this.querySelector('.swym-storefront-layout-collection-carousel-title'),
      carouselContainer: this.querySelector('.swym-storefront-layout-carousel-container'),
      carousel: this.querySelector('#swym-storefront-layout-collection-carousel-items-container'),
      carouselPrevButton: this.querySelector('.swym-storefront-layout-carousel-prev-btn'),
      carouselNextButton: this.querySelector('.swym-storefront-layout-carousel-next-btn')
    }
    this.attachEventListner();
  }

  setData({ collections }) {
    this.collections = collections;
    this.renderCollections();
  }

  renderUI() {
    this.innerHTML = `
    <div class="swym-storefront-layout-collection-carousel-container">
      <div class="swym-storefront-layout-collection-carousel-title">${SwymStorefrontLayoutContext?.Strings?.collectionTitle}</div>
      <div class="swym-storefront-layout-carousel-container">
        <button class="swym-storefront-layout-carousel-btn swym-storefront-layout-carousel-prev-btn" aria-label="Scroll Left">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="swym-storefront-layout-scroll-button-icon" aria-hidden="true"><path d="m13.333 8 8 8-8 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <div id="swym-storefront-layout-collection-carousel-items-container" class="swym-storefront-layout-carousel swym-storefront-layout-scrollable">
          <swym-storefront-layout-loader loading="true" loadertype="${SwymStorefrontLayoutContext?.LoaderViewType.CarouselListItem}" width="100%" height="100px"></swym-storefront-layout-loader>
        </div>
        <button class="swym-storefront-layout-carousel-btn swym-storefront-layout-carousel-next-btn" aria-label="Scroll Right">
          <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="swym-storefront-layout-scroll-button-icon" aria-hidden="true"><path d="m13.333 8 8 8-8 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>
    </div>
    `
  }

  attachEventListner() {

    this.elements.carouselPrevButton.addEventListener("click", () => {
      this.elements.carousel.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    });

    this.elements.carouselNextButton.addEventListener("click", () => {
      this.elements.carousel.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    });

    this.elements.carousel.addEventListener("scroll", () => this.updateCarouselButtonVisibility());

  }

  renderCollections() {
    const collectionsContainer = this.querySelector('#swym-storefront-layout-collection-carousel-items-container');
    if (collectionsContainer) {

      window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutCollectionRendered, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });

      if (this.collections && this.collections.length) {
        this.elements.carouselContainer.classList.add('swym-storefront-layout-has-items');
        collectionsContainer.innerHTML = this.collections
          .map(
            (collection) => {
              let { lname, listcontents, lid } = collection;

              const listImagesHtml = Array.from({ length: 3 })
                .map((_, i) => {
                  let item = listcontents[i];
                  return `
                  <div class="${i === 0 ? 'swym-storefront-layout-collection-grid-item-primary-image' : 'swym-storefront-layout-collection-grid-item-secondary-image'} ">
                    ${item?.iu ? `<img src="${item ? item.iu : null}" alt="${item?.dt? item?.dt : 'product Image'}" class="swym-storefront-layout-collection-grid-item-image" />` : `<div class="swym-storefront-layout-collection-grid-item-image" ></div>`}
                  </div>
                `;
                })
                .join("");

              const count = listcontents.length;

              return `
              <div class="swym-storefront-layout-collection-grid-item" data-lid="${lid}">
                <div class="swym-storefront-layout-collection-grid-item-image-container">
                  ${listImagesHtml}
                </div>
                <div class="swym-storefront-layout-collection-grid-item-info-container">
                  <div class="swym-storefront-layout-collection-grid-item-name">${lname}</div>
                  <div class="swym-storefront-layout-collection-grid-item-count">${count} ${count === 1 ? SwymStorefrontLayoutContext?.Strings?.item : SwymStorefrontLayoutContext?.Strings?.items}</div>
                </div>
                <div id="swym-storefront-layout-collection-grid-item-option-button" class="swym-storefront-layout-collection-grid-item-option-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="none">
                    <circle cx="1.5" cy="1.50014" r="1.5" fill="#B1B7C3"/>
                    <circle cx="1.5" cy="6.50014" r="1.5" fill="#B1B7C3"/>
                    <circle cx="1.5" cy="11.5001" r="1.5" fill="#B1B7C3"/>
                  </svg>
                </div>
              </div>
            `
            }
          )
          .join('');
        this.updateCarouselButtonVisibility();
        this.attachEventListnerToCollectionGrid();
      } else {
        this.elements.carouselContainer.classList.remove('swym-storefront-layout-has-items');
        collectionsContainer.innerHTML = `
          <div class="swym-storefront-layout-collection-empty">${SwymStorefrontLayoutContext?.Strings?.emptyCarouselCollectionText}</div>
        `;
      }

      let collectionCount = this.collections?.length;
      if(this.elements.title){
        this.elements.title.innerHTML = `${SwymStorefrontLayoutContext?.Strings?.collectionTitle} ${collectionCount?`(${collectionCount})`:''}`;
      }
    }
  }


  updateCarouselButtonVisibility() {
    const scrollLeft = this.elements.carousel.scrollLeft;
    const maxScrollLeft = this.elements.carousel.scrollWidth - this.elements.carousel.clientWidth;

    this.elements.carouselPrevButton.style.display = scrollLeft > 0 ? "flex" : "none";
    this.elements.carouselNextButton.style.display = scrollLeft < maxScrollLeft ? "flex" : "none";
  }

  attachEventListnerToCollectionGrid() {
    this.collections.forEach((collection) => {
      const collectionItem = this.elements.carousel.querySelector(
        `[data-lid="${collection.lid}"]`
      );
      collectionItem?.addEventListener("click", (event) => {
        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutCollectionOpened, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
        window.location.hash = SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.CollectionList + collection.lid;
      });

      let collectionItemActionButton =  collectionItem.querySelector('#swym-storefront-layout-collection-grid-item-option-button');
      collectionItemActionButton?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if(SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.isTooltipOpen && SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.currentTarget === event.target){
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.closeTooltip();
        }else{
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
            listId: collection.lid,
            list: collection,
            collections: this.collections,
            actionType: SwymStorefrontLayoutContext?.ActionTypes.EditCollection
          });
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.showOnTarget(event.target);
        }
      })

    })
  }
}

/**
 * SwymStorefrontLayoutWishlistItem
 *
 * This custom web component represents an item in the Swym Storefront Layout Wishlist.
 * It dynamically renders product details, pricing, and actions such as adding to cart
 * or managing wishlist options. It also handles variant selection and user interactions
 * based on the store's configuration settings.
 *
 * Key Features:
 * - Displays product title, image, price, and compare-at price.
 * - Supports multiple product variants and allows selection.
 * - Handles "Add to Cart" functionality with visual feedback.
 * - Manages user interactions for wishlist options and collections.
 * - Ensures compatibility with store localization settings.
 *
 * Dependencies:
 * - SwymStorefrontLayoutContext: Provides store settings, strings, and utilities.
 * - SwymStorefrontLayoutExtensions: Handles tooltips and notifications.
 * - _swat.platform: Manages cart operations.
 *
 * Usage:
 * This component should be used within the Swym Storefront Layout to display 
 * wishlist items effectively while maintaining a seamless user experience.
 */
class SwymStorefrontLayoutWishlistItem extends HTMLElement{
  constructor() {
    super();
    this.item = null;
    this.list = null;
    this.sflList = null;
    this.selectedVariant = null;
    this.collections = null;
    this.listItemType = SwymStorefrontLayoutContext?.ListItemType?.WishlistItem;
  }

  setData({ item, list, sflList, listItemType, collections }) {
    this.item = item;
    this.listItemType = listItemType;
    this.list = list;
    this.sflList = sflList;
    this.collections = collections;

    this.selectedVariantId = this.item?.cprops?.selectedVariantId || this.item?.epi;
    this.selectedVariant = SwymStorefrontLayoutContext?.getSelectedVariant(this.item, this.selectedVariantId);

    this.dataset.epi = this.selectedVariant?.id || this.item?.epi;
    this.dataset.empi = this.item?.empi;
    this.dataset.du = this.item?.['du-mkt'] || this.item?.du;

    this.renderItem();
    this.initItemElements();
    this.addEventListeners();
  }

  getProductImage() {
    const productImage = this.selectedVariant?.featured_image;
    const imageUrl = typeof productImage === 'string' ? productImage : productImage?.src;
    return (
      imageUrl ||
      this.item?.productData?.featured_image ||
      this.item?.iu
    );
  }

  getFormattedPrice() {
    let price = this.selectedVariant?.price ?? this.item?.productData?.price;  
    if (price === undefined || price === null) {
      price = this.item?.pr;
    }
    return price !== undefined && price !== null
    ? SwymStorefrontLayoutContext?.FormatPrice(price)
    : '';
  }
  getFormattedComparePrice() {
    let price = this.selectedVariant?.compare_at_price ?? this.item?.productData?.compare_at_price;
    if (price === undefined || price === null) {
      price = this.item?.op;
    }
    return price !== undefined && price !== null
    ? SwymStorefrontLayoutContext?.FormatPrice(price)
    : '';
  }

  getButtonState() {
    const isInCart = _swat.platform.isInDeviceCart(this.selectedVariant?.id);
    if(this.listItemType === SwymStorefrontLayoutContext?.ListItemType?.SaveForLaterItem){
      return this.selectedVariant?.available
      ? SwymStorefrontLayoutContext?.Strings?.moveToCartCta
      : SwymStorefrontLayoutContext?.Strings?.soldOut;
    }else{
      return this.selectedVariant?.available
      ? isInCart
        ? SwymStorefrontLayoutContext?.Strings?.addedToCart
        : SwymStorefrontLayoutContext?.Strings?.addToCart
      : SwymStorefrontLayoutContext?.Strings?.soldOut;
    }
  }

  renderVariants() {
    if (SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutVariantSelector && this.item?.productData?.variants?.length > 1) {
      return `
        <span class="swym-storefront-layout-price-devider">|</span>
        <div class="swym-storefront-layout-grid-item-variants-container">
          ${this.item.productData.options
            .map(
              (option, index) => `
                  ${index==0?'':'<span class="swym-storefront-layout-variant-devider"></span>'}
                  <div id="variant-selector-${this.item.empi}" class="swym-storefront-layout-variant">
                    ${option.values
                      .map(
                        (value) =>
                        this.selectedVariant?.[`option${index + 1}`] === value?value:''
                      )
                      .join('')}
                  </div>
                `
            )
            .join('')}
        </div>
      `;
    }
    return '';
  }

  renderVariantSelector() {
    if (SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutVariantSelector && this.item?.productData?.variants?.length > 1) {
      return `
        <div class="swym-storefront-layout-grid-item-variant-selector-container">
          ${this.item.productData.options
            .map(
              (option, index) => `
                ${option.values && option.values.length>1 ? `
                  <select id="variant-selector-${this.item.empi}" class="swym-storefront-layout-variant-selector">
                    <option value="${option.name}" disabled>${option.name}</option>
                    ${option.values
                      .map(
                        (value) =>
                          `<option value="${value}" ${
                            this.selectedVariant[`option${index + 1}`] === value ? 'selected' : ''
                          }>${value}</option>`
                      )
                      .join('')}
                  </select>
                `:''}
              `
            )
            .join('')}
        </div>
      `;
    }
    return '';
  }
    renderOptionButton() {
      // FIXME - remove repetative code once testing is done
      const isOldControlCentre = !(
        "multiple-wishlist" in (window?.SwymEnabledCommonFeatures || {})
      );
      // Determine the boolean condition based on whether it's the old or new control centre
      const shouldAddToCollection = isOldControlCentre
        ? SwymStorefrontLayoutContext?.Settings
            ?.EnableStorefrontLayoutCollection // For old control centre, use this setting
        : window?.SwymEnabledCommonFeatures?.["multiple-wishlist"]; // For new control centre, use this feature flag

      if (
        shouldAddToCollection ||
        SwymStorefrontLayoutContext?.checkUserCanEditList(
          this.list || this.sflList
        )
      ) {
        return `
      <button id="swym-storefront-layout-grid-item-option-button" class="swym-storefront-layout-grid-item-option-button" tabindex="0" role="button" aria-label="Open item options">
        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="currentcolor" tabindex="0" role="button" aria-label="Open item options">
          <circle cx="1.5" cy="1.50014" r="1.5" fill="#B1B7C3"/>
          <circle cx="1.5" cy="6.50014" r="1.5" fill="#B1B7C3"/>
          <circle cx="1.5" cy="11.5001" r="1.5" fill="#B1B7C3"/>
        </svg>
      </button>
    `;
      }
      return "";
    }
  isTagAvailable(tag, product) {
    return window._swat && window._swat.platform?.isTagAvailable(
      tag,
      product
    );
  }

  getDefaultValue(val, defaultValue) {
    return val ? val : defaultValue;
  }
  
  renderItem() {
    if(_swat.marketsEnabled && this.item?.['du-mkt'] == null ){
      return;
    }
    const settings = window._swat.retailerSettings;
    const IsTagBasedActionEnabled = settings?.Wishlist?.TagBasedActionEnabled;

    const hideAddtoCartTag = this.getDefaultValue(settings?.UI?.HideAddToCartTag, "swym-hide-addtocart");
    const disabledAddtoCartTag = this.getDefaultValue(settings?.UI?.DisabledAddtoCartTag, "swym-disabled-addtocart-with-text");
    const hideProductPriceTag = this.getDefaultValue(settings?.UI?.HideProductPriceTag, "swym-hide-productprice");
    
    const productInfo = this.item?.productData;

    const isHidden = IsTagBasedActionEnabled && this.isTagAvailable(hideAddtoCartTag, productInfo);
    const isDisabled = IsTagBasedActionEnabled && this.isTagAvailable(disabledAddtoCartTag, productInfo);
    const hidePrice = IsTagBasedActionEnabled && this.isTagAvailable(hideProductPriceTag, productInfo);
    
    let localizedUrl = `${this.item.du}?variant=${this.item?.epi}`;
    const locale = window.Shopify.routes.root

    if (locale !== '/') {
      const splitUrl = this.item.du.split('/products/')
      localizedUrl = `${splitUrl[0]}${locale}products/${splitUrl[1]}`;
    }
    if(this.item?.['du-mkt']){
      localizedUrl = this.item['du-mkt']
    }
    const noVariant = this.selectedVariant?.title === "Default Title";
    const matchingItem = this.list?.listcontents.find(item => item.epi === this.selectedVariant?.id);
    const isAutoWishlist = matchingItem?.source === "auto-wishlist";
    const isFirstVariant = matchingItem?.productData?.variants?.[0]?.id === this.selectedVariant?.id;

    let price = this.getFormattedPrice();
    let comparePrice = this.getFormattedComparePrice();

    this.innerHTML = `
      <div class="swym-storefront-layout-grid-item">
        <a href="${localizedUrl}" class="swym-storefront-layout-grid-item-image-container">
          <img src="${this.getProductImage()}" alt="${this.item?.dt ? this.item.dt : 'Product image'}" class="swym-storefront-layout-grid-item-image" />
        </a>
        <div class="swym-storefront-layout-grid-item-content">
          <a href="${localizedUrl}" class="swym-storefront-layout-grid-item-title">${this.item?.dt || ''}</a>
          <div class="swym-storefront-layout-grid-item-price-variant">
           ${!hidePrice ? `<span class="swym-storefront-layout-grid-item-final-price">${price}</span>` : ''}
           ${comparePrice && comparePrice !== price && !hidePrice && this.selectedVariant?.compare_at_price ? `<span class="swym-storefront-layout-grid-item-compare-price">${comparePrice}</span>`: ''}
${this.renderVariants()}
          </div>
          <div class="swym-storefront-layout-grid-item-action-container">
          ${isAutoWishlist && isFirstVariant && !noVariant && !isHidden ?
            `<button class="swym-variant-selector" id="swym-variant-selector">
              ${window.SwymStorefrontLayoutContext?.Strings?.VariantSelectorBtnText}
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="11" viewBox="0 0 7 11" fill="none">
                            <path id="Vector 6" d="M1 9.5L5.44444 5.5L1 1.5" stroke="#121F36" stroke-width="1.5"/>
                          </svg>
            </button>` : ``}
            ${
              (
                (isAutoWishlist && !isFirstVariant && !isHidden) || 
                (isAutoWishlist && noVariant && !isHidden) 
              ) ?
            `<button class="swym-storefront-layout-grid-item-add-to-cart-button" data-action="add-to-cart"
              ${!this.selectedVariant?.available || isDisabled ? 'disabled' : ''} aria-label="${this.getButtonState()}">
              ${this.getButtonState()}
            </button>` : ""
            }
            ${
              !isAutoWishlist && !isHidden ? 
              `<button class="swym-storefront-layout-grid-item-add-to-cart-button" data-action="add-to-cart"
              ${!this.selectedVariant?.available || isDisabled ? 'disabled' : ''} aria-label="${this.getButtonState()}">
              ${this.getButtonState()}
            </button>`: ""
            }
          </div>
        </div>
        ${this.renderOptionButton()}
      </div>
    `;

  }

  initItemElements(){
    this.elements = {
      AddToCartButton: this.querySelector('[data-action="add-to-cart"]'),
      Image: this.querySelector('.swym-storefront-layout-grid-item-image'),
      Price: this.querySelector('.swym-storefront-layout-grid-item-final-price'),
      ComparePrice: this.querySelector('.swym-storefront-layout-grid-item-compare-price'),
      OptionButton: this.querySelector('#swym-storefront-layout-grid-item-option-button'),
      sflItemsContainer : document.querySelector(`swym-storefront-layout-sfl-container .swym-storefront-layout-items-container`),
      swymVariantSelector: this.querySelector('#swym-variant-selector')
    }
  }

  addEventListeners() {
    this.elements.AddToCartButton?.addEventListener('click', (event) => {
      if(this.listItemType === SwymStorefrontLayoutContext?.ListItemType?.SaveForLaterItem){
        this.handleMoveToCart(event);
      }else{
        this.handleAddToCart(event);
      }
    });
    this.elements.OptionButton?.addEventListener('click', (event) => {
      if(SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.isTooltipOpen && SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.currentTarget === event.target){
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.closeTooltip();
      }else{
        if(this.listItemType === SwymStorefrontLayoutContext?.ListItemType?.WishlistItem || this.listItemType === SwymStorefrontLayoutContext?.ListItemType?.CollectionItem){
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
            listId: this.list.lid,
            list: this.list,
            item: this.item,
            selectedVariantId: this.selectedVariant?.id,
            collections: this.collections,
            actionType: SwymStorefrontLayoutContext?.ActionTypes.ManageListItem
          });
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.showOnTarget(event.target);
        }else if(this.listItemType === SwymStorefrontLayoutContext?.ListItemType?.SaveForLaterItem){
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
            listId: this.sflList?.lid,
            list: this.sflList,
            item: this.item,
            selectedVariantId: this.selectedVariant?.id,
            collections: this.collections,
            actionType: SwymStorefrontLayoutContext?.ActionTypes.ManageSflListItem
          });
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.showOnTarget(event.target);
        }
      }
    });
    const variantSelectors = this.querySelectorAll('.swym-storefront-layout-variant-selector');
    variantSelectors?.forEach((selector) =>
      selector.addEventListener('change', () => this.handleVariantSelectionChange())
    );
    this.elements.swymVariantSelector?.addEventListener('click', (event) => {
      window._swat.evtLayer.dispatchEvent(new CustomEvent("sw:renderVS", {
        detail: {
          variant: this.selectedVariant,
          lid: this.item.lid,
          product: {
            epi: this.item.epi,
            empi: this.item.empi, 
            dt: this.item.dt,
            variants: this.item.productData.variants,
            du: this.item?.['du-mkt'] || this.item.du,
            options: this.item.productData.options
          }
        }
      }))
    })
  }

  handleAddToCart(event) {
    event.preventDefault();
    let button = event.target;

    let { empi, epi, du } = this.dataset;

    let originalButtonState = button.innerHTML;
    button.innerHTML = SwymStorefrontLayoutContext?.Strings?.addingToCart;
    button.setAttribute('disabled', true);

    _swat.replayAddToCart(
      { empi: +empi, du: du, qty: 1 },
      +epi,
      (success) => {
        button.innerHTML = SwymStorefrontLayoutContext?.Strings?.addedToCart;
        button.removeAttribute('disabled');

        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          message: SwymStorefrontLayoutContext?.Strings?.notificationMessageAddedToCart,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
          actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToCart,
          image: this.item.iu,
          product: this.item,
          duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
          action: {
            label: SwymStorefrontLayoutContext?.Strings?.notificationActionGoToCart,
            onClick: () => {
              window.location.href = `${window.Shopify.routes.root}cart`;
            }
          }
        }, {
          showActionButton: true,
          showTitle: true
        });

        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutItemAddedToCart, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutCartConversion, epi, empi });
        window?._SwymAJAXCart();
      },
      (error) => {
        button.innerHTML = originalButtonState;
        button.removeAttribute('disabled');
        window._swat?.utils.warn('Error :', error.description);
        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          title: error.description,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Error
        },{
          showTitle: true,
          showImage: false
        });
      }
    );
  }

  handleMoveToCart(event) {
    event.preventDefault();
    let button = event.target;

    let { empi, epi, du } = this.dataset;

    let originalButtonState = button.innerHTML;
    button.innerHTML = SwymStorefrontLayoutContext?.Strings?.movingToCartCta;
    button.setAttribute('disabled', true);
    
    window._swat?.replayAddToCart(
      { empi: +empi, du: du, qty: 1 },
      +epi,
      async (success) => {
        try{
          await SwymStorefrontLayoutAPI?.SwymSFLAsyncApis?.removeProductFromSFL({ epi, empi, du }, SwymStorefrontLayoutContext.sflListId);
          let elementDeleted = this.elements.sflItemsContainer?.querySelector(`[data-epi="${epi}"]`);
          elementDeleted?.remove();
          window._swat?.triggerSwymEvent(window._swat?.JSEvents?.movedToCartFromSFL, this.item);

          SwymStorefrontLayoutExtensions?.Notification?.setMessage({
            message: SwymStorefrontLayoutContext?.Strings?.notificationMessageMovedToCart,
            status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
            actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToCart,
            image: this.item.iu,
            product: this.item,
            duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
            action: {
              label: SwymStorefrontLayoutContext?.Strings?.notificationActionGoToCart,
              onClick: () => {
                window.location.href = `${window.Shopify.routes.root}cart`;
              }
            }
          }, {
            showActionButton: true,
            showTitle: true
          });
  
          window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutSFLItemMovedToCart, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutCartConversion, epi, empi });
          window?._SwymAJAXCart();
        }catch(error){
          button.innerHTML = originalButtonState;
          button.removeAttribute('disabled');
          window._swat?.utils.warn('Error removing SFL Items:', error);
        }

      },
      (error) => {
        button.innerHTML = originalButtonState;
        button.removeAttribute('disabled');
        window._swat?.utils.warn('Error :', error.description);
        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          title: error.description,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Error
        },{
          showTitle: true,
          showImage: false
        });
      }
    );
  }

  async handleVariantSelectionChange() {

    let selectedOptions = {};
    const variantSelectors = this.querySelectorAll(".swym-storefront-layout-variant-selector");
    
    variantSelectors.forEach((selector) => {
      const selectedValue = selector.value?.trim();
      const optionIndex = selector.dataset.optionindex;
    
      if (selectedValue && optionIndex) {
        selectedOptions[`option${optionIndex}`] = selectedValue;
      }
    });
    
    const selectedVariant = this.item.productData.variants.find((variant) =>
      Object.entries(selectedOptions).every(([key, value]) => variant[key] === value)
    );

    this.selectedVariant = selectedVariant;
    this.dataset.epi = selectedVariant.id;
    this.item.cprops = this.item.cprops ?? {};
    this.item.cprops.selectedVariantId = selectedVariant.id;

    if (selectedVariant) {
      this.elements.AddToCartButton.textContent = this.getButtonState();
      if (selectedVariant.available) {
        this.elements.AddToCartButton.removeAttribute('disabled');
      } else {
        this.elements.AddToCartButton.setAttribute('disabled', true);
      }

      this.elements.Price.textContent =this.getFormattedPrice();
      this.elements.ComparePrice.textContent = this.getFormattedComparePrice();

      const productImage = selectedVariant?.featured_image?.src || this.item.productData?.featured_image || item.iu;
      this.elements.Image.src = productImage;

      let canEdit = (this.list?.userinfo?.em === SwymStorefrontLayoutContext?.SwymCustomerData?.email) || this.list?.canEdit;

      if(SwymStorefrontLayoutContext?.checkUserCanEditList(this.list)){
        let { epi, empi, du } = this.item;
        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutVariantChanged, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutItemInteractions, epi, empi });
        await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.updateProductFromList({ epi, empi, du, cprops: { selectedVariantId: selectedVariant.id } }, this.list.lid);
      }
    } else {
      window._swat?.utils.warn("No matching variant found for the selected options:", selectedOptions);
    }
  }

}

/**
 * SwymStorefrontLayoutDefaultWishList
 * 
 * This custom HTML element represents the default wishlist layout in the storefront.
 * It handles rendering wishlist items dynamically and updating the UI when new wishlist data is set.
 * 
 * Features:
 * - Initializes with a loading state until wishlist data is available.
 * - Fetches product details for wishlist items and updates the UI.
 * - Displays an empty state when no wishlist items exist.
 * - Uses Swym API and instrumentation to track interactions.
 * 
 * Usage:
 * <swym-storefront-layout-default-wishlist></swym-storefront-layout-default-wishlist>
 */
class SwymStorefrontLayoutDefaultWishList extends HTMLElement {
  constructor() {
    super();
    this.wishlist = null;
    this.collections = null;
    this.renderUI();
    this.elements = {
      title: this.querySelector('.swym-storefront-layout-default-list-title'),
      itemsContainer: this.querySelector('#swym-storefront-layout-items-container')
    }
  }

  handleAddToCart(event, productDetail) {
    event.preventDefault();
    let button = event.target;

    let empi = productDetail.empi; //8445423517851;
    let epi = productDetail.epi; //46212304076955;
    let du = productDetail.du; //"https://swym-test-onboarding-2-0.myshopify.com/products/the-collection-snowboard-hydrogen"

    let originalButtonState = button.innerHTML;
    button.innerHTML = SwymStorefrontLayoutContext?.Strings?.addingToCart;
    button.setAttribute('disabled', true);

    _swat.replayAddToCart(
      { empi: +empi, du: du, qty: 1 },
      +epi,
      (success) => {
        button.innerHTML = SwymStorefrontLayoutContext?.Strings?.addedToCart;
        button.removeAttribute('disabled');

        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          message: SwymStorefrontLayoutContext?.Strings?.notificationMessageAddedToCart,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
          actionType: SwymStorefrontLayoutContext?.NotificationActionTypes.AddedToCart,
          image: "",
          product: "",
          duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
          action: {
            label: SwymStorefrontLayoutContext?.Strings?.notificationActionGoToCart,
            onClick: () => {
              window.location.href = `${window.Shopify.routes.root}cart`;
            }
          }
        }, {
          showActionButton: true,
          showTitle: true
        });
      },
      (error) => {
        button.innerHTML = originalButtonState;
        button.removeAttribute('disabled');
        window._swat?.utils.warn('Error :', error.description);
        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          title: error.description,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Error
        },{
          showTitle: true,
          showImage: false
        });
      }
    );
  }

  renderUI() {
    if(window.Shopify.designMode && !window.SwymCurrentStorePath) {
      const swymMockProductData = window.SwymSampleProduct;
      
      // Extract and clean up the IDs
      const swymMockProductId = swymMockProductData?.id?.replace('gid://shopify/Product/', '');
      const swymMockVariantId = swymMockProductData?.variants?.edges?.[0]?.node?.id?.replace('gid://shopify/ProductVariant/', '');
      
      // Construct the product URL using Shopify.shop
      const swymMockProductUrl = `https://${window.Shopify.shop}/products/${swymMockProductData?.handle}`;
      
      window.SwymParsedSampleProduct = {
        image: swymMockProductData?.variants?.edges?.[0]?.node?.image,
        empi: swymMockProductId,
        epi: swymMockVariantId,
        du: swymMockProductUrl,
        title: swymMockProductData?.variants?.edges?.[0]?.node?.title,
        price: `$${swymMockProductData?.variants?.edges?.[0]?.node?.price}`
      };

      this.innerHTML = `<div id="swym-storefront-layout-items-container" class="swym-storefront-layout-items-container"><div class="swym-storefront-layout-grid-item">
          <a href="#" class="swym-storefront-layout-grid-item-image-container">
            <img src="${window.SwymParsedSampleProduct?.image}" alt="${window.SwymParsedSampleProduct?.title ? window.SwymParsedSampleProduct.title : 'Product image'}" class="swym-storefront-layout-grid-item-image" />
          </a>
          <div class="swym-storefront-layout-grid-item-content">
            <a href="${window.SwymParsedSampleProduct?.du}" class="swym-storefront-layout-grid-item-title">${window.SwymParsedSampleProduct.title || ''}</a>
            <div class="swym-storefront-layout-grid-item-price-variant">
              <span class="swym-storefront-layout-grid-item-final-price">${window.SwymParsedSampleProduct?.price}</span>
            </div>
            <div class="swym-storefront-layout-grid-item-action-container">
              <button class="swym-storefront-layout-grid-item-add-to-cart-button" data-action="add-to-cart"
                aria-label="Add To Cart +">
                Add To Cart +
              </button>
            </div>
          </div>
        </div></div>`

        const addToCartBtn = this.querySelector(".swym-storefront-layout-grid-item-add-to-cart-button");
        if (addToCartBtn) {
          addToCartBtn.addEventListener("click", (e) => {
            this.handleAddToCart(e, window.SwymParsedSampleProduct)
          });
        }
        return;
    }
    // FIXME - remove repetative code once testing is done
    const isOldControlCentre = !('multiple-wishlist' in (window?.SwymEnabledCommonFeatures || {}));
    // Determine the boolean condition based on whether it's the old or new control centre
    const shouldAddToCollection = isOldControlCentre
        ? SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection // For old control centre, use this setting
        : window?.SwymEnabledCommonFeatures?.['multiple-wishlist']; // For new control centre, use this feature flag

    this.innerHTML = `
      <div class="swym-storefront-layout-default-list-container">
      ${shouldAddToCollection ? `
          <div class="swym-storefront-layout-default-list-title-container"> 
            <div class="swym-storefront-layout-default-list-title">${SwymStorefrontLayoutContext?.Strings?.wishlistTitle}</div>
            <div class="swym-storefront-layout-default-list-info">${SwymStorefrontLayoutContext?.Strings?.wishlistInfo}</div>
          </div>
        ` : ''}
        <div id="swym-storefront-layout-items-container" class="swym-storefront-layout-items-container">
          <swym-storefront-layout-loader loading="true" loadertype="${SwymStorefrontLayoutContext?.LoaderViewType.WishlistListItem}" buttonCta="${SwymStorefrontLayoutContext?.Strings?.addToCart}" height="100px"></swym-storefront-layout-loader>
        </div>
      </div>
    `
  }

  setData({ wishlist, collections }) {
    this.wishlist = wishlist;
    this.collections = collections;
    if (this.elements?.itemsContainer?.dataset && this.wishlist?.lid) {
      this.elements.itemsContainer.dataset.lid = this.wishlist.lid;
    }
    this.renderWishlist();
  }

  async renderWishlist() {
    if (this.wishlist?.listcontents?.length && this.elements.itemsContainer) {
      
      window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutWishlistItemsRendered, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });

      const wishlistedProducts = this.wishlist?.listcontents;
      const fragment = document.createDocumentFragment();

      wishlistedProducts.forEach((item) => {
        const wishlistItem = document.createElement('template');
        wishlistItem.innerHTML = `<swym-storefront-layout-item id="swym-storefront-layout-item-${item.empi}-${item.epi}" ></swym-storefront-layout-item>`;
        fragment.appendChild(wishlistItem.content);
      });
      
      this.elements.itemsContainer.innerHTML = '';
      this.elements.itemsContainer.appendChild(fragment);

      wishlistedProducts.forEach((item) => {
        let wishlistItemElement = document.querySelector(`#swym-storefront-layout-item-${item.empi}-${item.epi}`);
        wishlistItemElement?.setData({
          item,
          listItemType: SwymStorefrontLayoutContext?.ListItemType?.WishlistItem,
          list: this.wishlist,
          collections: this.collections
        })
      });
      this.elements.itemsContainer.classList.remove('swym-storefront-layout-items-has-empty');
    }else{
      this.elements.itemsContainer.innerHTML = `
        <div class="swym-storefront-layout-empty-container">
          <div class="swym-storefront-layout-empty-wishlist-container">
            <div class="swym-storefront-layout-empty-wishlist-content">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="85" viewBox="0 0 86 85" fill="none">
                <rect width="59.5441" height="78.6833" transform="translate(0.710449 6.1748) rotate(-5.46887)" fill="white"/>
                <rect x="0.710938" y="6.1748" width="59.5441" height="78.6833" rx="1.21519" transform="rotate(-5.46887 0.710938 6.1748)" fill="#FDFDFD"/>
                <rect x="0.983626" y="6.39984" width="59.0441" height="78.1833" rx="0.965186" transform="rotate(-5.46887 0.983626 6.39984)" stroke="black" stroke-opacity="0.1" stroke-width="0.5"/>
                <rect x="5.57364" y="10.7446" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 5.57364 10.7446)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="13.0841" y="11.0938" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 13.0841 11.0938)" fill="#D0D0D0"/>
                <rect x="6.44223" y="19.8169" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 6.44223 19.8169)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="13.9527" y="20.166" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 13.9527 20.166)" fill="#D0D0D0"/>
                <rect x="7.31107" y="28.8892" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 7.31107 28.8892)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="14.8214" y="29.2383" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 14.8214 29.2383)" fill="#D0D0D0"/>
                <rect x="8.17942" y="37.9619" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 8.17942 37.9619)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="15.6899" y="38.311" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 15.6899 38.311)" fill="#D0D0D0"/>
                <rect x="9.04825" y="47.0342" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 9.04825 47.0342)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="16.5587" y="47.3833" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 16.5587 47.3833)" fill="#D0D0D0"/>
                <rect x="9.91666" y="56.1069" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 9.91666 56.1069)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="17.4271" y="56.4561" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 17.4271 56.4561)" fill="#D0D0D0"/>
                <rect x="10.7854" y="65.1792" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 10.7854 65.1792)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="18.2959" y="65.5283" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 18.2959 65.5283)" fill="#D0D0D0"/>
                <rect x="11.6538" y="74.2515" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 11.6538 74.2515)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
                <rect x="19.1643" y="74.6006" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 19.1643 74.6006)" fill="#D0D0D0"/>
                <rect x="55.0288" y="35.834" width="31.0853" height="31.0853" transform="rotate(13.2248 55.0288 35.834)" fill="url(#pattern0_489_1797)"/>
                <defs>
                <pattern id="pattern0_489_1797" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_489_1797" transform="scale(0.0104167)"/>
                </pattern>
                <image id="image0_489_1797" width="96" height="96" xlink:href="data:image/png;base64,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"/>
                </defs>
              </svg>
              <div class="swym-storefront-layout-empty-wishlist-title">${SwymStorefrontLayoutContext?.Strings?.emptyWishlistTitle}</div>
              <div class="swym-storefront-layout-empty-wishlist-description">${SwymStorefrontLayoutContext?.Strings?.emptyWishlistDescription}</div>
            </div>
          </div>
        </div>
      `;
      this.elements.itemsContainer.classList.add('swym-storefront-layout-items-has-empty');
    }

    let wishlistCount = this.wishlist?.listcontents?.length || 0;
    if(this.elements.title){
      this.elements.title.innerHTML = `${SwymStorefrontLayoutContext?.Strings?.wishlistTitle} ${wishlistCount?`(${wishlistCount})`:''}`;
    }
  }


}

/**
 * SwymStorefrontLayoutCollectionList
 *
 * A custom HTML element representing a collection list within the Swym Storefront Layout.
 * This component is responsible for rendering a list of collections, displaying wishlist items, 
 * handling user interactions, and managing collection data.
 *
 * Features:
 * - Initializes and renders the UI dynamically.
 * - Fetches and displays wishlist items for a collection.
 * - Handles user permissions for editing or saving collections.
 * - Provides UI elements like back navigation, action buttons, and collection details.
 *
 * Usage:
 * ```html
 * <swym-storefront-layout-collection-list></swym-storefront-layout-collection-list>
 * ```
 * JavaScript:
 * ```js
 * const collectionListElement = document.createElement('swym-storefront-layout-collection-list');
 * collectionListElement.setData({ list: myList, collections: myCollections });
 * document.body.appendChild(collectionListElement);
 * ```
 */
class SwymStorefrontLayoutCollectionList extends HTMLElement {
  constructor() {
    super();
    this.collectionList = null;
    this.collections = null;
  }
  initUI(){
    this.renderUI();
    this.elements = {
      backButton: this.querySelector('.swym-storefront-layout-collection-list-back-button'),
      itemsContainer: this.querySelector('#swym-storefront-layout-collection-list-items-container'),
      collectionCount: this.querySelector('.swym-storefront-layout-collection-items-count'),
      title: this.querySelector('.swym-storefront-layout-collection-title'),
      swymListActionButton: this.querySelector('#swym-storefront-layout-collection-option-button'),
      userAccessInfo: this.querySelector('#swym-storefront-layout-collection-list-access-info'),
      collectionImages: this.querySelector('#swym-storefront-layout-collection-list-images-container')
    }
    this.addEventListenerToView();
  }

  setData({ list, collections }) {
    this.initUI();
    this.renderLoader();
    this.collectionList = list;
    this.collections = collections;
    if(this.collectionList){
      this.elements.itemsContainer.dataset.lid = this.collectionList.lid;
      this.canEdit = SwymStorefrontLayoutContext?.checkUserCanEditList(this.collectionList);
      this.renderCollectionlist();
    }
  }

  renderUI() {
    this.innerHTML = `
    <div class="swym-storefront-layout-collection-list-container">
      <div class="swym-storefront-layout-collection-list-header">
        <div id="swym-storefront-layout-collection-list-images-container">
        </div>
        <div class="swym-storefront-layout-collection-list-header-content">
          <div class="swym-storefront-layout-collection-list-back-button">
            <svg data-v-bfb713a3="" data-v-326364ff="" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="base-icon back-icon" aria-hidden="true"><path d="M15.44 7a.96.96 0 0 0-.96-.96H3.951l3.903-3.638A.96.96 0 1 0 6.544 1L.856 6.297a.963.963 0 0 0 0 1.404L6.543 13a.96.96 0 1 0 1.31-1.404L3.952 7.96H14.48a.96.96 0 0 0 .96-.96Z" fill="currentColor"></path></svg>
          </div>
          <div class="swym-storefront-layout-collection-title-container">
            <div class="swym-storefront-layout-collection-title"></div>
            <div class="swym-storefront-layout-collection-items-count"></div>
            <div id="swym-storefront-layout-collection-option-button" class="swym-storefront-layout-collection-option-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="currentcolor">
                <circle cx="1.5" cy="1.50014" r="1.5" fill="currentColor"></circle>
                <circle cx="1.5" cy="6.50014" r="1.5" fill="currentColor"></circle>
                <circle cx="1.5" cy="11.5001" r="1.5" fill="currentColor"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="swym-storefront-layout-collection-list-content swym-storefront-layout-scrollable">
        <div id="swym-storefront-layout-collection-list-access-info"></div>
        <div id="swym-storefront-layout-collection-list-items-container" class="swym-storefront-layout-items-container">
        </div>
      </div>
      <swym-storefront-layout-login-user showLogin="true"></swym-storefront-layout-login-user>
    </div>
    `
  }

  addEventListenerToView() {
    this.elements.backButton.addEventListener('click', () => {
      window.location.hash = SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.List;
      this.closeCollectinListView()
    });

    this.elements.swymListActionButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.isTooltipOpen && SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.currentTarget === event.target){
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.closeTooltip();
      }else{
        if(this.canEdit){
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
            listId: this.collectionList.lid,
            list: this.collectionList,
            collections: this.collections,
            actionType: SwymStorefrontLayoutContext?.ActionTypes.EditCollection
          });
        }else{
          SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
            listId: this.collectionList.lid,
            list: this.collectionList,
            collections: this.collections,
            actionType: SwymStorefrontLayoutContext?.ActionTypes.SaveCollection
          });
        }
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.showOnTarget(event.target);
      }
    });
  }

  async renderCollectionlist() {
    if (this.collectionList && this.collectionList.listcontents && this.elements.itemsContainer) {

      this.elements.title.innerHTML = `<div class="swym-storefront-layout-collection-title">${this.collectionList.lname}</div>`;

      let itemsCount = this.collectionList?.listcontents?.length || 0;
      this.elements.collectionCount.innerHTML = itemsCount?`${itemsCount} ${itemsCount<=1? SwymStorefrontLayoutContext?.Strings?.item : SwymStorefrontLayoutContext?.Strings?.items }`:'';
      
      const wishlistedProducts = this.collectionList.listcontents;
      const fragment = document.createDocumentFragment();

      this.elements.collectionImages.innerHTML = `
        <div class="swym-storefront-layout-collection-list-images">
          ${wishlistedProducts.slice(0, 5).map((item, index) => 
            item 
              ? `<img class="swym-storefront-layout-collection-list-image swym-storefront-layout-collection-list-image-${index}" src="${item.iu}" alt="Wishlist Image">`
              : ``
          ).join('')}
        </div>
      `;

      

      if(itemsCount){
        wishlistedProducts.forEach((item) => {
          const wishlistItem = document.createElement('template');
          wishlistItem.innerHTML = `<swym-storefront-layout-item id="swym-storefront-layout-collection-item-${item.empi}-${item.epi}" ></swym-storefront-layout-item>`;
          fragment.appendChild(wishlistItem.content);
        });
        
        this.elements.itemsContainer.innerHTML = '';
        this.elements.itemsContainer.appendChild(fragment);
  
        wishlistedProducts.forEach((item) => {
          let wishlistItemElement = document.querySelector(`#swym-storefront-layout-collection-item-${item.empi}-${item.epi}`);
          wishlistItemElement?.setData({
            item,
            listItemType: SwymStorefrontLayoutContext?.ListItemType?.CollectionItem,
            list: this.collectionList,
            collections: this.collections
          })
        });
      }else{
        this.renderEmptyView();
      }

      let isUserLogged = SwymStorefrontLayoutContext?.isShopperLoggedIn;
      if(isUserLogged && !!this.collectionList?.userinfo?.em && this.collectionList?.userinfo?.em != SwymStorefrontLayoutContext?.SwymCustomerData?.email){
        let email = this.collectionList?.userinfo?.em;
        this.elements.userAccessInfo.innerHTML = window._swat?.utils?.renderTemplateString( SwymStorefrontLayoutContext?.Strings?.sharedCollectionMessage, { email });
      }else{
        this.elements.userAccessInfo.innerHTML = ``;
      }

      this.openCollectionListView();
    }
  }

  renderEmptyView(){
    this.elements.itemsContainer.innerHTML = `
      <div class="swym-storefront-layout-empty-container">
        <div class="swym-storefront-layout-empty-wishlist-container">
          <div class="swym-storefront-layout-empty-wishlist-content">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="86" height="85" viewBox="0 0 86 85" fill="none">
              <rect width="59.5441" height="78.6833" transform="translate(0.710449 6.1748) rotate(-5.46887)" fill="white"/>
              <rect x="0.710938" y="6.1748" width="59.5441" height="78.6833" rx="1.21519" transform="rotate(-5.46887 0.710938 6.1748)" fill="#FDFDFD"/>
              <rect x="0.983626" y="6.39984" width="59.0441" height="78.1833" rx="0.965186" transform="rotate(-5.46887 0.983626 6.39984)" stroke="black" stroke-opacity="0.1" stroke-width="0.5"/>
              <rect x="5.57364" y="10.7446" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 5.57364 10.7446)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="13.0841" y="11.0938" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 13.0841 11.0938)" fill="#D0D0D0"/>
              <rect x="6.44223" y="19.8169" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 6.44223 19.8169)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="13.9527" y="20.166" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 13.9527 20.166)" fill="#D0D0D0"/>
              <rect x="7.31107" y="28.8892" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 7.31107 28.8892)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="14.8214" y="29.2383" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 14.8214 29.2383)" fill="#D0D0D0"/>
              <rect x="8.17942" y="37.9619" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 8.17942 37.9619)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="15.6899" y="38.311" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 15.6899 38.311)" fill="#D0D0D0"/>
              <rect x="9.04825" y="47.0342" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 9.04825 47.0342)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="16.5587" y="47.3833" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 16.5587 47.3833)" fill="#D0D0D0"/>
              <rect x="9.91666" y="56.1069" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 9.91666 56.1069)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="17.4271" y="56.4561" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 17.4271 56.4561)" fill="#D0D0D0"/>
              <rect x="10.7854" y="65.1792" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 10.7854 65.1792)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="18.2959" y="65.5283" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 18.2959 65.5283)" fill="#D0D0D0"/>
              <rect x="11.6538" y="74.2515" width="5.16454" height="5.16454" rx="0.455695" transform="rotate(-5.46887 11.6538 74.2515)" fill="#FBFBFB" stroke="#D0D0D0" stroke-width="0.303797"/>
              <rect x="19.1643" y="74.6006" width="44.6581" height="3.03797" rx="0.607593" transform="rotate(-5.46887 19.1643 74.6006)" fill="#D0D0D0"/>
              <rect x="55.0288" y="35.834" width="31.0853" height="31.0853" transform="rotate(13.2248 55.0288 35.834)" fill="url(#pattern0_489_1797)"/>
              <defs>
              <pattern id="pattern0_489_1797" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_489_1797" transform="scale(0.0104167)"/>
              </pattern>
              <image id="image0_489_1797" width="96" height="96" xlink:href="data:image/png;base64,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"/>
              </defs>
            </svg>
            <div class="swym-storefront-layout-empty-wishlist-title">${SwymStorefrontLayoutContext?.Strings?.emptyCollectionText}</div>
            <div class="swym-storefront-layout-empty-wishlist-description">${SwymStorefrontLayoutContext?.Strings?.emptyCollectionDescription}</div>
          </div>
        </div>
      </div>
    `;
    this.elements.itemsContainer.classList.add('swym-storefront-layout-items-has-empty');
  }

  renderLoader(){
    this.elements.collectionImages.innerHTML = `<swym-storefront-layout-loader loading="true" loadertype="${SwymStorefrontLayoutContext?.LoaderViewType.CollectionImages}" height="80%"></swym-storefront-layout-loader>`;
    this.elements.itemsContainer.innerHTML = `<swym-storefront-layout-loader loading="true" loadertype="${SwymStorefrontLayoutContext?.LoaderViewType.WishlistListItem}" height="80%"></swym-storefront-layout-loader>`;
  }

  clearUI(){
    this.innerHTML = '';
  }

  openCollectionListView() {
    this.classList.add('swym-storefront-layout-show-collection-list');
  }

  closeCollectinListView() {
    this.classList.remove('swym-storefront-layout-show-collection-list');
    setTimeout(()=>{
      this.clearUI();
    },100);
  }

}


/**
 * SwymStorefrontLayoutActions - Custom Web Component
 *
 * This class extends `HTMLElement` to create and manage the UI for wishlist-related actions 
 * in the Swym Storefront Layout. It handles functionalities such as:
 *
 * - Displaying a modal-like action panel for managing wishlist items.
 * - Supporting different action types (e.g., adding an item to a collection).
 * - Rendering the UI dynamically based on the selected list or collection.
 * - Managing event listeners to update UI interactions seamlessly.
 *
 * Key Features:
 * - Renders a structured UI layout with an image, title, options, and action buttons.
 * - Supports selecting collections and dynamically updates the UI upon selection.
 * - Implements event handling for collection management, including adding new collections.
 * - Uses `SwymStorefrontLayoutContext` for accessing relevant wishlist and collection data.
 *
 * Usage:
 * - This component is initialized automatically when added to the DOM.
 * - Data can be set via `setData({ listId, list, item, selectedVariantId, collections, actionType })`.
 * - Internal methods like `renderAddToCollection()` handle specific UI updates.
 *
 * Example:
 * ```html
 * <swym-storefront-layout-actions></swym-storefront-layout-actions>
 * ```
 *
 * Dependencies:
 * - Requires `SwymStorefrontLayoutContext` for accessing wishlist and collection data.
 * - Uses event listeners for handling user interactions.
 *
 * Notes:
 * - Ensures smooth UI updates with proper event handling and DOM manipulations.
 * - Uses query selectors to manage DOM elements efficiently.
 */
class SwymStorefrontLayoutActions extends HTMLElement {
  constructor() {
    super();

    this.actionType = SwymStorefrontLayoutContext?.ActionTypes.ManageListItem;

    this.wishlistItem = null;
    this.collections = null;
    this.listId = null;
    this.list = null;
    this.selectedCollectionLid = null;
    this.selectedList = null;
    this.renderUI();
    this.elements = {
      container: this.querySelector('.swym-storefront-layout-actions-container'),
      backdrop: this.querySelector('.swym-storefront-layout-action-backdrop'),
      closeButton: this.querySelector('.swym-storefront-layout-action-close-button'),
      title: this.querySelector('.swym-storefront-layout-action-title-container'),
      optionsContainer: this.querySelector('#swym-storefront-layout-action-options'),
      actionContianer: this.querySelector('#swym-storefront-layout-action-container'),
      wishlistItemsContainer: document.querySelector('swym-storefront-layout-wishlist-container #swym-storefront-layout-items-container'),
      sflItemsContainer: document.querySelector('swym-storefront-layout-sfl-container #swym-storefront-layout-items-container'),
      imageContainer: this.querySelector('.swym-storefront-layout-action-image-container')
    }
    this.addEventListenerToView();
  }

  renderUI() {
    this.innerHTML = `
    <div class="swym-storefront-layout-actions-container">
      <div class="swym-storefront-layout-action-backdrop"></div>
      <div class="swym-storefront-layout-action-layout">
        <div class="swym-storefront-layout-action-image-container"></div>
        <div class="swym-storefront-layout-action-content">
          <div class="swym-storefront-layout-action-header">
            <div class="swym-storefront-layout-action-title-container"></div>
            <button class="swym-storefront-layout-action-close-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="white"/>
                <path d="M13.9697 15.0303C14.2626 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697L11.0607 10L15.0303 6.03033C15.3232 5.73744 15.3232 5.26256 15.0303 4.96967C14.7374 4.67678 14.2626 4.67678 13.9697 4.96967L10 8.93934L6.03033 4.96967C5.73744 4.67678 5.26256 4.67678 4.96967 4.96967C4.67678 5.26256 4.67678 5.73744 4.96967 6.03033L8.93934 10L4.96967 13.9697C4.67678 14.2626 4.67678 14.7374 4.96967 15.0303C5.26256 15.3232 5.73744 15.3232 6.03033 15.0303L10 11.0607L13.9697 15.0303Z" fill="#4A4A4A"/>
              </svg>
            </button>
          </div>
          <div id="swym-storefront-layout-action-options"></div>
          <div id="swym-storefront-layout-action-container"></div>
        </div>
      </div>
    </div>
    `
  }

  setData({ listId, list, item, selectedVariantId, collections, actionType = SwymStorefrontLayoutContext?.ActionTypes.ManageListItem }) {
    this.listId = listId;
    this.list = list;
    this.wishlistItem = item;
    this.collections = SwymStorefrontLayoutContext?.collections;
    this.currentSlectedVariantId = selectedVariantId;
    this.selectedCollectionLid = this.collections[0]?.lid;
    this.selectedList = this.collections[0] || null;
    this.elements.wishlistItemsContainer = document.querySelector(`.swym-storefront-layout-items-container[data-lid="${listId}"]`);
    this.elements.actionContianer.innerHTML = '';
    if (actionType === SwymStorefrontLayoutContext?.ActionTypes.AddToCollection) {
      this.renderAddToCollection();
    } 
    SwymStorefrontLayoutExtensions?.checkContainerScrollbar(this.elements.optionsContainer);
  }

  async renderAddToCollection() {
    this.collections = SwymStorefrontLayoutContext?.collections || [];
    if (this.collections && this.elements.optionsContainer) {

      this.elements.imageContainer.innerHTML = `<img src="${this.wishlistItem.iu}"></img>`;
      
      this.elements.title.innerHTML = `
        <div class="swym-storefront-layout-action-addtocollection-title">
          <div class="swym-storefront-layout-action-product-title">${this.wishlistItem.dt}</div>
          <div class="swym-storefront-layout-action-title">${SwymStorefrontLayoutContext?.Strings?.addToCollectionTitle}</div>
        </div>
      `
      this.renderCollectionOptions();
      this.renderCreteCollectionAction()
    }
  }

  renderCollectionOptions(){
    this.elements.optionsContainer.innerHTML = `
        ${this.collections.map((collection) => {

        let { lid, lname, listcontents } = collection;
        let item = listcontents[0];
        let count = listcontents.length;

        // Check if current product exists in this collection
        const productExists = listcontents.some(listItem => 
            listItem.epi === this.wishlistItem.epi
        );

        const listImagesHtml = Array.from({ length: 3 })
          .map((_, i) => {
            let item = listcontents[i];
            return `
            <div class="${i === 0 ? 'swym-storefront-layout-action-collection-item-image-primary' : 'swym-storefront-layout-action-collection-item-image-secondary'} ">
              ${item?.iu ? `<img src="${item ? item.iu : null}" class="swym-storefront-layout-action-collection-item-image" />` : `<div class="swym-storefront-layout-action-collection-item-image" ></div>`}
            </div>
          `;
          })
          .join("");

        return `
            <div class="swym-storefront-layout-collection-action-btn add-item-to-collection swym-storefront-layout-action-collection-item-container" data-lid="${lid}">
              <div class="swym-storefront-layout-action-collection-image-container">
                ${listImagesHtml}
              </div>
              <div class="swym-storefront-layout-action-collection-content">
                <div class="swym-storefront-layout-action-collection-item-name">${lname}</div>
                <div class="swym-storefront-layout-action-collection-item-count">${count} ${count === 1 ? 'item' : 'items'}</div>
              </div>
              <div class="swym-storefront-layout-checkbox-container">
                <label class="swym-storefront-layout-checkbox">
                  <input type="checkbox" ${productExists ? 'checked' : ''} name="swym-storefront-layout-collections">
                  <span class="swym-storefront-layout-checkmark"></span>
                </label>
              </div>
            </div>
          `
      }).join('')}
      `;

      this.addMangeCollectionEventListeners();
  }

  addMangeCollectionEventListeners() {
    // Track initial checkbox states
    this.initialCheckStates = new Map();
    this.newlyCheckedLids = [];    // Declare at class level
    this.newlyUncheckedLids = [] // Array for newly unchecked lids
    
    this.collections.forEach((collection) => {
      const collectionItem = this.querySelector(`[data-lid="${collection.lid}"]`);
      const checkbox = collectionItem?.querySelector('input[type="checkbox"]');
      
      // Store initial checked state
      if (checkbox) {
        this.initialCheckStates.set(collection.lid, checkbox.checked);
      }

      // Add event listener specifically for the checkbox
      collectionItem?.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();

        // Toggle checkbox
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        
        const collectionSaveButton = this.querySelector('#swym-storefront-layout-save-collection-list-button');
        // Clear arrays on each click
        this.newlyCheckedLids = [];
        this.newlyUncheckedLids = [];

        const collectionNameInput = this.querySelector('#swym-storefront-layout-create-collection-name-input');

        this.collections.forEach(col => {
          const item = this.querySelector(`[data-lid="${col.lid}"]`);
          const cb = item?.querySelector('input[type="checkbox"]');
          if (cb) {
            const wasChecked = this.initialCheckStates.get(col.lid);
            const isNowChecked = cb.checked;
            
            if (!wasChecked && isNowChecked) {
                this.newlyCheckedLids.push(col.lid);
            }
            if (wasChecked && !isNowChecked) {
                this.newlyUncheckedLids.push(col.lid);
            }
          }
        });

        // Enable button if there are any changes
        if (collectionSaveButton) {
          const hasChanges = this.newlyCheckedLids.length > 0 || this.newlyUncheckedLids.length > 0;
          collectionSaveButton.disabled = !hasChanges;      
          // Update button text based on changes
          if (hasChanges) {
            if (this.newlyUncheckedLids.length > 0 && this.newlyCheckedLids.length === 0) {
                // Only unchecking existing items
             if (!collectionNameInput.value.trim()) {
                    collectionSaveButton.textContent = SwymStorefrontLayoutContext?.Strings?.removeItemCta;
                } else {
                    collectionSaveButton.textContent = SwymStorefrontLayoutContext?.Strings?.updateCollectionCta || "Update List";
                }
              } else if (this.newlyCheckedLids.length > 0 && this.newlyUncheckedLids.length === 0) {
                // Only adding new items
                collectionSaveButton.textContent = SwymStorefrontLayoutContext?.Strings?.addToCollectionCta || "Add to Collection";
            } else {
                // Both adding and removing
                collectionSaveButton.textContent = SwymStorefrontLayoutContext?.Strings?.updateCollectionCta || "Update List";
            }
          } else {
            if (collectionNameInput.value.trim() && collectionNameInput.value.trim().length >= 3) {
              collectionSaveButton.textContent = SwymStorefrontLayoutContext?.Strings?.addToCollectionCta || "Add to Collection";
              collectionSaveButton.disabled = false;
            }
          }
        }
        // Toggle selected class on the parent container
        collectionItem.classList.toggle('swym-storefront-layout-checkbox-selected');
        // Your existing logic for handling checkbox state
      });
      // Prevent checkbox from triggering twice
      checkbox?.addEventListener('click', (event) => {
          event.stopPropagation();
      });
    });
  }

  renderCreteCollectionAction(){
    this.elements.actionContianer.innerHTML = `
        <form id="swym-storefront-layout-create-collection-form">
          <div class="swym-storefront-layout-create-collection-name-form-group">
            <input
              type="text"
              id="swym-storefront-layout-create-collection-name-input"
              class="swym-storefront-layout-action-input create-collection-name-input"
              placeholder="${SwymStorefrontLayoutContext?.Strings?.createCollectionCta}"
            />
            <div class="swym-storefront-layout-checkbox-container">
              <label class="swym-storefront-layout-checkbox">
                <input type="checkbox" ${this.selectedCollectionLid === 'fromInput'?'checked':''} name="swym-storefront-layout-collections">
                <span class="swym-storefront-layout-checkmark"></span>
              </label>
            </div>
            <div id="swym-storefront-layout-create-collection-error-message-container" class="error-message" style="display: none;">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="base-icon error-icon" aria-hidden="true"><path d="M7 .7a6.3 6.3 0 1 0 0 12.6A6.3 6.3 0 0 0 7 .7Zm.7 9.8H6.3V9.1h1.4v1.4Zm0-2.1H6.3V3.5h1.4v4.9Z" fill="currentColor"></path></svg>
              <span id="swym-storefront-layout-create-collection-error-message">Name is required</span>
            </div>
          </div>
          <button type="submit" id="swym-storefront-layout-save-collection-list-button" class="swym-storefront-layout-save-collection-list-button" disabled>${SwymStorefrontLayoutContext?.Strings?.addToCollectionCta}</button>
        </form>
      `;
      this.addCreateCollectionEventListeners();
  }

  addCreateCollectionEventListeners() {
    const createCollectionForm = this.querySelector('#swym-storefront-layout-create-collection-form');
    const collectionNameInputContainer = this.querySelector('.swym-storefront-layout-create-collection-name-form-group');
    const collectionNameInput = this.querySelector('#swym-storefront-layout-create-collection-name-input');

    collectionNameInput.addEventListener("focus", () => {
      this.selectedCollectionLid = 'fromInput';
      this.validateCollectionInputField(false);
    });
    
    collectionNameInput.addEventListener("blur", () => {
      if (!collectionNameInput.value.trim()) {
        const errorMessageContainer = this.querySelector('#swym-storefront-layout-create-collection-error-message-container');
        const errorMessage = this.querySelector('#swym-storefront-layout-create-collection-error-message');
        
        // Hide error message
        errorMessage.innerHTML = '';
        errorMessageContainer.style.display = 'none';
        collectionNameInput.classList.remove('swym-storefront-layout-input-has-error');
      }
    });

    collectionNameInput.addEventListener('input', () => {
      this.validateCollectionInputField();
    });

    createCollectionForm.addEventListener('submit', async (event) => {
      try {
        event.preventDefault();
        let listIdToAdd;
        if(this.selectedCollectionLid === 'fromInput' && collectionNameInput.value.length >= 3){
          let name = collectionNameInput.value.trim();
          let newList = await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.createList(name);
          listIdToAdd = newList.lid;
          this.newlyCheckedLids.push(listIdToAdd);
          this.selectedList = newList;
        } 
        let { epi, empi, du, iu } = this.wishlistItem;

         // Check if item is being moved from default list
        // Check if item exists in default list
        const isInDefaultList = SwymStorefrontLayoutContext?.DefaultList?.listcontents.some(
          item => item.epi === epi && item.empi === empi
        );
        if(this.newlyCheckedLids.length >  0 && this.newlyUncheckedLids.length > 0) {
         SwymStorefrontLayoutContext.CommonAddtoWL = true; 
         SwymStorefrontLayoutContext.CommonRemovefromWL = true;
        }
        this.closeDrawer();

        if(this.newlyCheckedLids.length > 0) {
          // Add to new lists
          SwymStorefrontLayoutContext.CommonAddtoWL = true; 
           if(isInDefaultList) {
            SwymStorefrontLayoutContext.CommonRemovefromWL = true; 
            this.newlyUncheckedLids.push(SwymStorefrontLayoutContext?.DefaultList?.lid); 
          }
          await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.addProductToLists(
            { empi, epi, du }, 
            this.newlyCheckedLids
          );
        }
        // Handle unchecked lists (except default list)
        if(this.newlyUncheckedLids.length > 0) {
          SwymStorefrontLayoutContext.CommonRemovefromWL = true;
          await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.removeProductFromLists(
            { empi, epi, du },
            this.newlyUncheckedLids
          );
        }
        // Show notification
        if(this.newlyCheckedLids.length > 0 && this.newlyUncheckedLids.length > 0) {
          SwymStorefrontLayoutExtensions?.Notification?.setMessage({
            title: SwymStorefrontLayoutContext?.Strings?.notificationMessageCollectionUpdated,
            message: SwymStorefrontLayoutContext?.Strings?.notificationMessageCollectionUpdated,
            status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
            actionType: "",
            duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
            product: this.wishlistItem,
            image: iu,
            action: {
              label:  SwymStorefrontLayoutContext?.Strings?.notificationActionView,
              onClick: () => {
                _swat.ui.open();
              },
            }
          },{
            showActionButton: true,
            showTitle: false,
            showProgress: true
          });   
          SwymStorefrontLayoutContext.CommonAddtoWL = false;
          SwymStorefrontLayoutContext.CommonRemovefromWL = false;  
        }
        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutCollectionCreated, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutCollectionInteractions });
      } catch (error) {
        window._swat?.utils.error('Error on create and add product to list', error);
      }
    }); 
    // auto focus create collection input by default when no collection available
    if(!this.collections?.length){
      setTimeout(() => {
        collectionNameInput?.focus();
      }, 50);
    }
  }

  validateCollectionInputField(showError = true){

    const collectionNameInput = this.querySelector('#swym-storefront-layout-create-collection-name-input');
    const collectionSaveButton = this.querySelector('#swym-storefront-layout-save-collection-list-button');
    const errorMessageContainer = this.querySelector('#swym-storefront-layout-create-collection-error-message-container');
    const errorMessage = this.querySelector('#swym-storefront-layout-create-collection-error-message');
    const checkbox = collectionNameInput.closest('.swym-storefront-layout-create-collection-name-form-group')?.querySelector('input[type="checkbox"]');

    let name = collectionNameInput.value.trim();
    let error;

    let isNameExist = this.collections.some(collection => collection.lname.toLowerCase() === name.toLowerCase());

    // Check if there are any newly checked or unchecked items
    const hasChanges = this.newlyCheckedLids.length > 0 || this.newlyUncheckedLids.length > 0;

    if (name === '') {
      error = SwymStorefrontLayoutContext?.Strings?.errorMessageListNameRequired;
      checkbox.checked = false;
      if (this.selectedCollectionLid === 'fromInput') {
        this.selectedCollectionLid = null;
      }
    } else if (name.length < 3) {
      error = SwymStorefrontLayoutContext?.Strings?.errorMessageListNameRequire3Char;
      checkbox.checked = false;
        if (this.selectedCollectionLid === 'fromInput') {
        this.selectedCollectionLid = null;
      }
    }else if(isNameExist){
      error = SwymStorefrontLayoutContext?.Strings?.errorMessageListNameAlreadyExist;
      checkbox.checked = false;
      if (this.selectedCollectionLid === 'fromInput') {
        this.selectedCollectionLid = null;
      }
    }

    if (name.length > 0) {
      collectionNameInput.classList.add('swym-storefront-layout-input-has-value');
    } else {
      collectionNameInput.classList.remove('swym-storefront-layout-input-has-value');
    }

    if (error) {
      if(showError){
        errorMessage.innerHTML = error;
        errorMessageContainer.style.display = 'flex';
        collectionNameInput.classList.add('swym-storefront-layout-input-has-error');
      }
      // Only disable button if there are no other changes
      collectionSaveButton.disabled = !hasChanges;
    } else {
      errorMessage.innerHTML = '';
      errorMessageContainer.style.display = 'none';
      collectionSaveButton.disabled = false;
      collectionNameInput.classList.remove('swym-storefront-layout-input-has-error');
      // Auto check the checkbox when input is valid
      checkbox.checked = true;
      this.selectedCollectionLid = 'fromInput';
      // Update button text
      collectionSaveButton.textContent = SwymStorefrontLayoutContext?.Strings?.addToCollectionCta;
    }
  }

  addEventListenerToView() {
    this.elements.backdrop.addEventListener('click', () => this.closeDrawer());
    this.elements.closeButton.addEventListener('click', () => this.closeDrawer());
  }

  openDrawer() {
    this.elements.container.classList.add('swym-storefront-layout-show-action-view');
  }

  closeDrawer() {
    this.elements.container.classList.remove('swym-storefront-layout-show-action-view');
  }

}

/**
 * SwymStorefrontLayoutActionTooltip
 * 
 * This custom Web Component manages the action tooltip for storefront layout interactions.
 * It provides UI options for managing wishlist items, including adding to collections 
 * and removing from lists. The tooltip dynamically updates based on user actions 
 * and permissions.
 * 
 * Features:
 * - Displays options based on the selected wishlist item.
 * - Supports adding/removing items from collections or lists.
 * - Listens for user interactions and updates the UI accordingly.
 * - Ensures smooth integration with SwymStorefrontLayoutContext?.
 * 
 * Dependencies:
 * - SwymStorefrontLayoutContext: Provides necessary context for actions and permissions.
 * - SwymStorefrontLayoutAPI: Handles wishlist operations.
 * - SwymStorefrontLayoutExtensions: Manages UI interactions like opening drawers.
 */
class SwymStorefrontLayoutActionTooltip extends HTMLElement {
  constructor() {
    super();

    this.isTooltipOpen = false;
    this.currentTarget = null;
    this.actionType = SwymStorefrontLayoutContext?.ActionTypes.ManageListItem;

    this.listItem = null;
    this.collections = null;
    this.listId = null;
    this.list = null;
    this.renderUI();
    this.elements = {
      viewPortLayout: document.querySelector('.swym-storefront-layout-layout'),
      tooltipLayout: this.querySelector('.swym-storefront-layout-action-tooltip-layout'),
      optionsContainer: this.querySelector('#swym-storefront-layout-action-tooltip-options'),
      wishlistItemsContainer: document.querySelector('swym-storefront-layout-wishlist-container #swym-storefront-layout-items-container'),
      sflItemsContainer: document.querySelector('swym-storefront-layout-sfl-container #swym-storefront-layout-items-container')
    }
    this.addEventListenerToView();
  }

    renderUI() {
      this.innerHTML = `
    <div class="swym-storefront-layout-action-tooltip-layout">
      <div id="swym-storefront-layout-action-tooltip-options" tabindex="0" role="menu" aria-label="Delete from Wishlist"></div>
    </div>
  `;
    }

  setData({ listId, list, item, selectedVariantId, collections, actionType = SwymStorefrontLayoutContext?.ActionTypes.ManageListItem }) {
    this.listId = listId;
    this.list = list;
    this.listItem = item;
    this.collections = SwymStorefrontLayoutContext?.collections;
    this.currentSlectedVariantId = selectedVariantId;
    this.elements.wishlistItemsContainer = document.querySelector(`swym-storefront-layout-wishlist-container .swym-storefront-layout-items-container[data-lid="${listId}"]`)
    this.elements.sflItemsContainer = document.querySelector(`swym-storefront-layout-sfl-container .swym-storefront-layout-items-container[data-lid="${listId}"]`);
    if (actionType === SwymStorefrontLayoutContext?.ActionTypes.ManageListItem) {
      this.renderWishlistItemOptions();
    }else if(actionType === SwymStorefrontLayoutContext?.ActionTypes.EditCollection){
      this.renderEditCollection();
    }else if(actionType === SwymStorefrontLayoutContext?.ActionTypes.SaveCollection){
      this.renderSaveCollection();
    }else if(actionType === SwymStorefrontLayoutContext?.ActionTypes.ManageSflListItem){
      this.renderSflListItemOptions();
    } else if(actionType ===  SwymStorefrontLayoutContext?.ActionTypes.ShareSingleWishlist) {
      this.renderShareSingleWishlist();
    }
  }

  async renderWishlistItemOptions() {
    if (this.listItem && this.elements.optionsContainer) {
      let selectedVariantId = this.currentSlectedVariantId || this.listItem?.epi;
      const selectedVariant = SwymStorefrontLayoutContext?.getSelectedVariant(this.listItem, selectedVariantId);
      const productImage = selectedVariant?.featured_image?.src || this.listItem.productData?.featured_image || this.listItem.iu;
      let canEdit = SwymStorefrontLayoutContext?.checkUserCanEditList(this.list);
      // FIXME - remove repetative code once testing is done
      const isOldControlCentre = !('multiple-wishlist' in (window?.SwymEnabledCommonFeatures || {}));
      // Determine the boolean condition based on whether it's the old or new control centre
      const shouldAddToCollection = isOldControlCentre
          ? SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection // For old control centre, use this setting
          : window?.SwymEnabledCommonFeatures?.['multiple-wishlist']; // For new control centre, use this feature flag

      this.elements.optionsContainer.innerHTML = `
        ${shouldAddToCollection? `<div class="swym-storefront-layout-action-tooltip-btn add-to-collection-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M7.33331 8.66683H3.33331V7.3335H7.33331V3.3335H8.66665V7.3335H12.6666V8.66683H8.66665V12.6668H7.33331V8.66683Z" fill="currentColor"/>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.addToCollectionCta}
        </div>` : ''}
        ${canEdit?`<div class="swym-storefront-layout-action-tooltip-btn remove-from-list-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="currentColor">
            <path d="M4.66669 14.5C4.30002 14.5 3.98613 14.3694 3.72502 14.1083C3.46391 13.8472 3.33335 13.5333 3.33335 13.1667V4.5H2.66669V3.16667H6.00002V2.5H10V3.16667H13.3334V4.5H12.6667V13.1667C12.6667 13.5333 12.5361 13.8472 12.275 14.1083C12.0139 14.3694 11.7 14.5 11.3334 14.5H4.66669ZM11.3334 4.5H4.66669V13.1667H11.3334V4.5ZM6.00002 11.8333H7.33335V5.83333H6.00002V11.8333ZM8.66669 11.8333H10V5.83333H8.66669V11.8333Z" fill="currentColor"></path>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.removeItemCta}
        </div>`:''}
      `;
      this.addOptionEventListeners();
    }
  }

  async renderShareSingleWishlist() {
    if(this.elements.optionsContainer) {
      this.elements.optionsContainer.innerHTML = `<div class="swym-storefront-layout-action-tooltip-btn share-collection-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M9.91666 12.8337C9.43055 12.8337 9.01735 12.6635 8.67707 12.3232C8.3368 11.983 8.16666 11.5698 8.16666 11.0837C8.16666 11.0253 8.18124 10.8892 8.21041 10.6753L4.11249 8.28366C3.95693 8.42949 3.77707 8.54373 3.57291 8.62637C3.36874 8.70901 3.14999 8.75033 2.91666 8.75033C2.43055 8.75033 2.01735 8.58019 1.67707 8.23991C1.3368 7.89963 1.16666 7.48644 1.16666 7.00033C1.16666 6.51421 1.3368 6.10102 1.67707 5.76074C2.01735 5.42046 2.43055 5.25033 2.91666 5.25033C3.14999 5.25033 3.36874 5.29164 3.57291 5.37428C3.77707 5.45692 3.95693 5.57116 4.11249 5.71699L8.21041 3.32533C8.19096 3.25727 8.17881 3.19164 8.17395 3.12845C8.16909 3.06526 8.16666 2.99477 8.16666 2.91699C8.16666 2.43088 8.3368 2.01769 8.67707 1.67741C9.01735 1.33713 9.43055 1.16699 9.91666 1.16699C10.4028 1.16699 10.816 1.33713 11.1562 1.67741C11.4965 2.01769 11.6667 2.43088 11.6667 2.91699C11.6667 3.4031 11.4965 3.8163 11.1562 4.15658C10.816 4.49685 10.4028 4.66699 9.91666 4.66699C9.68332 4.66699 9.46457 4.62567 9.26041 4.54303C9.05624 4.46039 8.87638 4.34616 8.72082 4.20033L4.62291 6.59199C4.64235 6.66005 4.6545 6.72567 4.65936 6.78887C4.66423 6.85206 4.66666 6.92255 4.66666 7.00033C4.66666 7.0781 4.66423 7.14859 4.65936 7.21178C4.6545 7.27498 4.64235 7.3406 4.62291 7.40866L8.72082 9.80033C8.87638 9.65449 9.05624 9.54026 9.26041 9.45762C9.46457 9.37498 9.68332 9.33366 9.91666 9.33366C10.4028 9.33366 10.816 9.5038 11.1562 9.84408C11.4965 10.1844 11.6667 10.5975 11.6667 11.0837C11.6667 11.5698 11.4965 11.983 11.1562 12.3232C10.816 12.6635 10.4028 12.8337 9.91666 12.8337ZM9.91666 11.667C10.0819 11.667 10.2205 11.6111 10.3323 11.4993C10.4441 11.3875 10.5 11.2489 10.5 11.0837C10.5 10.9184 10.4441 10.7798 10.3323 10.668C10.2205 10.5562 10.0819 10.5003 9.91666 10.5003C9.75138 10.5003 9.61284 10.5562 9.50103 10.668C9.38923 10.7798 9.33332 10.9184 9.33332 11.0837C9.33332 11.2489 9.38923 11.3875 9.50103 11.4993C9.61284 11.6111 9.75138 11.667 9.91666 11.667ZM2.91666 7.58366C3.08193 7.58366 3.22048 7.52776 3.33228 7.41595C3.44409 7.30415 3.49999 7.1656 3.49999 7.00033C3.49999 6.83505 3.44409 6.69651 3.33228 6.5847C3.22048 6.4729 3.08193 6.41699 2.91666 6.41699C2.75138 6.41699 2.61284 6.4729 2.50103 6.5847C2.38923 6.69651 2.33332 6.83505 2.33332 7.00033C2.33332 7.1656 2.38923 7.30415 2.50103 7.41595C2.61284 7.52776 2.75138 7.58366 2.91666 7.58366ZM9.91666 3.50033C10.0819 3.50033 10.2205 3.44442 10.3323 3.33262C10.4441 3.22081 10.5 3.08227 10.5 2.91699C10.5 2.75171 10.4441 2.61317 10.3323 2.50137C10.2205 2.38956 10.0819 2.33366 9.91666 2.33366C9.75138 2.33366 9.61284 2.38956 9.50103 2.50137C9.38923 2.61317 9.33332 2.75171 9.33332 2.91699C9.33332 3.08227 9.38923 3.22081 9.50103 3.33262C9.61284 3.44442 9.75138 3.50033 9.91666 3.50033Z" fill="currentColor" fill-opacity="0.8"/>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.shareCollectionCta}
        </div>`;
        this.addEditCollectionEventListeners();
    }
  }

  async renderShareSFLWishlist() {
    if(this.elements.optionsContainer) {
      this.elements.optionsContainer.innerHTML = `<div class="swym-storefront-layout-action-tooltip-btn share-collection-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M9.91666 12.8337C9.43055 12.8337 9.01735 12.6635 8.67707 12.3232C8.3368 11.983 8.16666 11.5698 8.16666 11.0837C8.16666 11.0253 8.18124 10.8892 8.21041 10.6753L4.11249 8.28366C3.95693 8.42949 3.77707 8.54373 3.57291 8.62637C3.36874 8.70901 3.14999 8.75033 2.91666 8.75033C2.43055 8.75033 2.01735 8.58019 1.67707 8.23991C1.3368 7.89963 1.16666 7.48644 1.16666 7.00033C1.16666 6.51421 1.3368 6.10102 1.67707 5.76074C2.01735 5.42046 2.43055 5.25033 2.91666 5.25033C3.14999 5.25033 3.36874 5.29164 3.57291 5.37428C3.77707 5.45692 3.95693 5.57116 4.11249 5.71699L8.21041 3.32533C8.19096 3.25727 8.17881 3.19164 8.17395 3.12845C8.16909 3.06526 8.16666 2.99477 8.16666 2.91699C8.16666 2.43088 8.3368 2.01769 8.67707 1.67741C9.01735 1.33713 9.43055 1.16699 9.91666 1.16699C10.4028 1.16699 10.816 1.33713 11.1562 1.67741C11.4965 2.01769 11.6667 2.43088 11.6667 2.91699C11.6667 3.4031 11.4965 3.8163 11.1562 4.15658C10.816 4.49685 10.4028 4.66699 9.91666 4.66699C9.68332 4.66699 9.46457 4.62567 9.26041 4.54303C9.05624 4.46039 8.87638 4.34616 8.72082 4.20033L4.62291 6.59199C4.64235 6.66005 4.6545 6.72567 4.65936 6.78887C4.66423 6.85206 4.66666 6.92255 4.66666 7.00033C4.66666 7.0781 4.66423 7.14859 4.65936 7.21178C4.6545 7.27498 4.64235 7.3406 4.62291 7.40866L8.72082 9.80033C8.87638 9.65449 9.05624 9.54026 9.26041 9.45762C9.46457 9.37498 9.68332 9.33366 9.91666 9.33366C10.4028 9.33366 10.816 9.5038 11.1562 9.84408C11.4965 10.1844 11.6667 10.5975 11.6667 11.0837C11.6667 11.5698 11.4965 11.983 11.1562 12.3232C10.816 12.6635 10.4028 12.8337 9.91666 12.8337ZM9.91666 11.667C10.0819 11.667 10.2205 11.6111 10.3323 11.4993C10.4441 11.3875 10.5 11.2489 10.5 11.0837C10.5 10.9184 10.4441 10.7798 10.3323 10.668C10.2205 10.5562 10.0819 10.5003 9.91666 10.5003C9.75138 10.5003 9.61284 10.5562 9.50103 10.668C9.38923 10.7798 9.33332 10.9184 9.33332 11.0837C9.33332 11.2489 9.38923 11.3875 9.50103 11.4993C9.61284 11.6111 9.75138 11.667 9.91666 11.667ZM2.91666 7.58366C3.08193 7.58366 3.22048 7.52776 3.33228 7.41595C3.44409 7.30415 3.49999 7.1656 3.49999 7.00033C3.49999 6.83505 3.44409 6.69651 3.33228 6.5847C3.22048 6.4729 3.08193 6.41699 2.91666 6.41699C2.75138 6.41699 2.61284 6.4729 2.50103 6.5847C2.38923 6.69651 2.33332 6.83505 2.33332 7.00033C2.33332 7.1656 2.38923 7.30415 2.50103 7.41595C2.61284 7.52776 2.75138 7.58366 2.91666 7.58366ZM9.91666 3.50033C10.0819 3.50033 10.2205 3.44442 10.3323 3.33262C10.4441 3.22081 10.5 3.08227 10.5 2.91699C10.5 2.75171 10.4441 2.61317 10.3323 2.50137C10.2205 2.38956 10.0819 2.33366 9.91666 2.33366C9.75138 2.33366 9.61284 2.38956 9.50103 2.50137C9.38923 2.61317 9.33332 2.75171 9.33332 2.91699C9.33332 3.08227 9.38923 3.22081 9.50103 3.33262C9.61284 3.44442 9.75138 3.50033 9.91666 3.50033Z" fill="currentColor" fill-opacity="0.8"/>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.shareCollectionCta}
        </div>`;
        this.addShareSFLEventListeners();
    }
  }

  addEditCollectionEventListeners() {
    const shareCollectionBtn = this.querySelector('.share-collection-button');
    this.listId = SwymStorefrontLayoutContext?.sflList?.lid;
    shareCollectionBtn?.addEventListener('click', () => {
      this.shareCollection();
    });
  }

  addShareSFLEventListeners() {
    const shareCollectionBtn = this.querySelector('.share-collection-button');
    shareCollectionBtn?.addEventListener('click', () => {
      this.shareCollection(SwymStorefrontLayoutContext.sflList);
    });
  }
  
  addOptionEventListeners() {
    const addToCollectionBtn = this.querySelector('.add-to-collection-button');
    const removeFromListBtn = this.querySelector('.remove-from-list-button');

    addToCollectionBtn?.addEventListener('click', () => {
      this.closeTooltip();
      
      SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActions?.setData({
        listId: this.listId,
        list: this.list,
        item: this.listItem,
        collections: this.collections,
        actionType: SwymStorefrontLayoutContext?.ActionTypes.AddToCollection
      });
      SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActions?.openDrawer();

    });

    removeFromListBtn?.addEventListener('click', async () => {
      try {

        this.closeTooltip();

        let { epi, empi, du } = this.listItem;
        if(this.currentSlectedVariantId){
          epi = this.currentSlectedVariantId;
        }
        await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.removeProductFromList({ epi, empi, du }, this.listId);

        let elementDeleted = this.elements.wishlistItemsContainer?.querySelector(`[data-epi="${epi}"]`);
        elementDeleted?.remove();

        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutItemRemovedFromList, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutItemInteractions, epi, empi });

      } catch (error) {
        window._swat?.utils.error('Failed to remove product from the list:', error);
      }
    });
  }

  async renderEditCollection() {
    if (this.list && this.elements.optionsContainer) {
      this.elements.optionsContainer.innerHTML = `
        <div class="swym-storefront-layout-action-tooltip-btn share-collection-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M9.91666 12.8337C9.43055 12.8337 9.01735 12.6635 8.67707 12.3232C8.3368 11.983 8.16666 11.5698 8.16666 11.0837C8.16666 11.0253 8.18124 10.8892 8.21041 10.6753L4.11249 8.28366C3.95693 8.42949 3.77707 8.54373 3.57291 8.62637C3.36874 8.70901 3.14999 8.75033 2.91666 8.75033C2.43055 8.75033 2.01735 8.58019 1.67707 8.23991C1.3368 7.89963 1.16666 7.48644 1.16666 7.00033C1.16666 6.51421 1.3368 6.10102 1.67707 5.76074C2.01735 5.42046 2.43055 5.25033 2.91666 5.25033C3.14999 5.25033 3.36874 5.29164 3.57291 5.37428C3.77707 5.45692 3.95693 5.57116 4.11249 5.71699L8.21041 3.32533C8.19096 3.25727 8.17881 3.19164 8.17395 3.12845C8.16909 3.06526 8.16666 2.99477 8.16666 2.91699C8.16666 2.43088 8.3368 2.01769 8.67707 1.67741C9.01735 1.33713 9.43055 1.16699 9.91666 1.16699C10.4028 1.16699 10.816 1.33713 11.1562 1.67741C11.4965 2.01769 11.6667 2.43088 11.6667 2.91699C11.6667 3.4031 11.4965 3.8163 11.1562 4.15658C10.816 4.49685 10.4028 4.66699 9.91666 4.66699C9.68332 4.66699 9.46457 4.62567 9.26041 4.54303C9.05624 4.46039 8.87638 4.34616 8.72082 4.20033L4.62291 6.59199C4.64235 6.66005 4.6545 6.72567 4.65936 6.78887C4.66423 6.85206 4.66666 6.92255 4.66666 7.00033C4.66666 7.0781 4.66423 7.14859 4.65936 7.21178C4.6545 7.27498 4.64235 7.3406 4.62291 7.40866L8.72082 9.80033C8.87638 9.65449 9.05624 9.54026 9.26041 9.45762C9.46457 9.37498 9.68332 9.33366 9.91666 9.33366C10.4028 9.33366 10.816 9.5038 11.1562 9.84408C11.4965 10.1844 11.6667 10.5975 11.6667 11.0837C11.6667 11.5698 11.4965 11.983 11.1562 12.3232C10.816 12.6635 10.4028 12.8337 9.91666 12.8337ZM9.91666 11.667C10.0819 11.667 10.2205 11.6111 10.3323 11.4993C10.4441 11.3875 10.5 11.2489 10.5 11.0837C10.5 10.9184 10.4441 10.7798 10.3323 10.668C10.2205 10.5562 10.0819 10.5003 9.91666 10.5003C9.75138 10.5003 9.61284 10.5562 9.50103 10.668C9.38923 10.7798 9.33332 10.9184 9.33332 11.0837C9.33332 11.2489 9.38923 11.3875 9.50103 11.4993C9.61284 11.6111 9.75138 11.667 9.91666 11.667ZM2.91666 7.58366C3.08193 7.58366 3.22048 7.52776 3.33228 7.41595C3.44409 7.30415 3.49999 7.1656 3.49999 7.00033C3.49999 6.83505 3.44409 6.69651 3.33228 6.5847C3.22048 6.4729 3.08193 6.41699 2.91666 6.41699C2.75138 6.41699 2.61284 6.4729 2.50103 6.5847C2.38923 6.69651 2.33332 6.83505 2.33332 7.00033C2.33332 7.1656 2.38923 7.30415 2.50103 7.41595C2.61284 7.52776 2.75138 7.58366 2.91666 7.58366ZM9.91666 3.50033C10.0819 3.50033 10.2205 3.44442 10.3323 3.33262C10.4441 3.22081 10.5 3.08227 10.5 2.91699C10.5 2.75171 10.4441 2.61317 10.3323 2.50137C10.2205 2.38956 10.0819 2.33366 9.91666 2.33366C9.75138 2.33366 9.61284 2.38956 9.50103 2.50137C9.38923 2.61317 9.33332 2.75171 9.33332 2.91699C9.33332 3.08227 9.38923 3.22081 9.50103 3.33262C9.61284 3.44442 9.75138 3.50033 9.91666 3.50033Z" fill="currentColor" fill-opacity="0.8"/>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.shareCollectionCta}
        </div>
        <div class="swym-storefront-layout-action-tooltip-btn delete-list-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="currentColor">
            <path d="M4.66667 14.5C4.30001 14.5 3.98612 14.3694 3.72501 14.1083C3.46389 13.8472 3.33334 13.5333 3.33334 13.1667V4.5H2.66667V3.16667H6.00001V2.5H10V3.16667H13.3333V4.5H12.6667V13.1667C12.6667 13.5333 12.5361 13.8472 12.275 14.1083C12.0139 14.3694 11.7 14.5 11.3333 14.5H4.66667ZM11.3333 4.5H4.66667V13.1667H11.3333V4.5ZM6.00001 11.8333H7.33334V5.83333H6.00001V11.8333ZM8.66667 11.8333H10V5.83333H8.66667V11.8333Z" fill="currentColor"/>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.deleteCollectionCta}
        </div>
      `;
      this.addEditCollectionEventListeners();
    }
  }

  addEditCollectionEventListeners() {
    const shareCollectionBtn = this.querySelector('.share-collection-button');
    const deleteListBtn = this.querySelector('.delete-list-button');

    shareCollectionBtn?.addEventListener('click', () => {
      this.shareCollection();
      this.closeTooltip();
    });

    deleteListBtn?.addEventListener('click', async () => {
      try {
        await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.deleteLists([this.list]);
        this.closeTooltip();
        window.location.hash = SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.List;
        SwymStorefrontLayoutExtensions?.refreshWishList();
        const collectionListView = document.querySelector('swym-storefront-layout-collection-list');
        collectionListView.closeCollectinListView();

        SwymStorefrontLayoutExtensions?.Notification?.setMessage({
          message: SwymStorefrontLayoutContext?.Strings?.notificationMessageCollectionDeleted,
          status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Toast,
          iconType: SwymStorefrontLayoutContext?.NotificationIconType?.SuccessIcon
        });

        window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutCollectionDeleted, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutCollectionInteractions });

      } catch (error) {
        window._swat?.utils.error('Failed to remove product from the list:', error);
      }
    });
  }

  async renderSaveCollection() {
    if (this.list && this.elements.optionsContainer) {
      this.elements.optionsContainer.innerHTML = `
        <div class="swym-storefront-layout-action-tooltip-btn save-collection-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 48 48" fill="none">
            <path d="M8 28H24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 37H24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 19H40" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 10H40" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 33H40" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M35 28L35 38" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.saveCollectionCta}
        </div>
      `;
      this.addSaveCollectionEventListeners();
    }
  }

  addSaveCollectionEventListeners() {
    const saveCollectionBtn = this.querySelector('.save-collection-button');
    
    saveCollectionBtn?.addEventListener('click', () => {
      this.closeTooltip();
      this.handleSaveCollection();
    });
  }
  async shareCollection() {
    const activeTab = document.querySelector('.swym-storefront-layout-tab-button.swym-storefront-layout-tab-button-active');
    const activeDataView = activeTab?.getAttribute('data-view');
    window._swat.evtLayer.dispatchEvent(new CustomEvent('sw:renderShareWishlistUI', {
      detail: {
        lid: this.list?.lid || this.listId,
        lname: '',
        list: activeDataView === "tabSavedForLater" ? SwymStorefrontLayoutContext?.sflList : this.list,
        layoutType: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutType,
        senderName: '', // optional,
        activeDataView
      }
    }));
  }
  
  async handleSaveCollection(){
    let savedList = await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.createList(this.list.lname);
    let itemsToAdd = this.list.listcontents.map(({ empi, epi, du }) => ({ empi, epi, du }));
    await SwymStorefrontLayoutAPI?.SwymWLAsyncApis?.addProductsToList(itemsToAdd, savedList.lid);
    window.location.hash = SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.List;
    
    SwymStorefrontLayoutExtensions?.Notification?.setMessage({
      message: SwymStorefrontLayoutContext?.Strings?.notificationMessageCollectionSaved,
      status: SwymStorefrontLayoutContext?.NotificationStatusTypes?.Neutral,
      iconType: SwymStorefrontLayoutContext?.NotificationIconType?.SuccessIcon,
      duration: SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutNotificationDuration,
      action: {
        label: SwymStorefrontLayoutContext?.Strings?.notificationActionViewCollection,
        onClick: () => {
          window.location.hash = SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.CollectionList + savedList.lid;
        }
      }
    });

  }

  addEventListenerToView() {
    document.addEventListener("click", (event) => {
      if (!this.elements.tooltipLayout.contains(event.target)) {
        this.closeTooltip();
      }
    });
  }

  async renderSflListItemOptions(){
    if (this.listItem && this.elements.optionsContainer) {
      let selectedVariantId = this.currentSlectedVariantId || this.listItem?.epi;
      const selectedVariant = SwymStorefrontLayoutContext?.getSelectedVariant(this.listItem, selectedVariantId);
      let canEdit = SwymStorefrontLayoutContext?.checkUserCanEditList(this.list);
      this.elements.optionsContainer.innerHTML = `
        ${canEdit?`<div class="swym-storefront-layout-action-tooltip-btn remove-from-list-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="currentColor">
            <path d="M4.66669 14.5C4.30002 14.5 3.98613 14.3694 3.72502 14.1083C3.46391 13.8472 3.33335 13.5333 3.33335 13.1667V4.5H2.66669V3.16667H6.00002V2.5H10V3.16667H13.3334V4.5H12.6667V13.1667C12.6667 13.5333 12.5361 13.8472 12.275 14.1083C12.0139 14.3694 11.7 14.5 11.3334 14.5H4.66669ZM11.3334 4.5H4.66669V13.1667H11.3334V4.5ZM6.00002 11.8333H7.33335V5.83333H6.00002V11.8333ZM8.66669 11.8333H10V5.83333H8.66669V11.8333Z" fill="currentColor"></path>
          </svg>
          ${SwymStorefrontLayoutContext?.Strings?.removeSflItemCta}
        </div>`:''}
      `;
      this.addSflOptionEventListeners();
    }
  }

  addSflOptionEventListeners() {
    const removeFromListBtn = this.querySelector('.remove-from-list-button');

    removeFromListBtn?.addEventListener('click', async () => {
      try {

        this.closeTooltip();

        let { epi, empi, du } = this.listItem;
        if(this.currentSlectedVariantId){
          epi = this.currentSlectedVariantId;
        }
        await SwymStorefrontLayoutAPI?.SwymSFLAsyncApis?.removeProductFromSFL({ epi, empi, du }, this.listId);

        let elementDeleted = this.elements.sflItemsContainer?.querySelector(`[data-epi="${epi}"]`);
        elementDeleted?.remove();

        window._swat?.triggerSwymEvent(window._swat?.JSEvents?.removedFromSFL, this.listItem);

      } catch (error) {
        window._swat?.utils.error('Failed to remove product from the list:', error);
      }
    });
  }

  attachEventToHideTooltip(){

    window.removeEventListener("scroll", ()=> this.closeTooltip());
    window.addEventListener("scroll", ()=> this.closeTooltip());

    let scrollableElements = document.querySelectorAll('.swym-storefront-layout-scrollable');

    scrollableElements.forEach((element) => {
      element.removeEventListener("scroll", ()=> this.closeTooltip());
      element.addEventListener("scroll", ()=> this.closeTooltip());
    });
  }

    openTooltip() {
      this.isTooltipOpen = true;
      const tl = this.elements.tooltipLayout;

      tl.classList.add("swym-storefront-layout-show-action-tooltip-view");
      tl.setAttribute("role", "dialog");
      tl.setAttribute("aria-hidden", "false");
      tl.setAttribute("tabindex", "-1");
      tl.focus();

      tl.addEventListener(
        "keydown",
        (e) => {
          if (["Enter", " "].includes(e.key)) {
            e.preventDefault();
            tl.querySelector(
              ".delete-list-button, .remove-from-list-button, .add-to-collection-button, .share-collection-button"
            )?.click();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            this.hideTooltip();
          }
        },
        { once: true }
      );

      this.attachEventToHideTooltip();
    }

  showOnTarget(buttonTarget){
    this.closeTooltip();

    let viewPort = document.querySelector('.swym-storefront-layout-layout');

    const tooltip = this.elements.tooltipLayout;
    let buttonRect = buttonTarget.getBoundingClientRect();
    let viewPortRect = viewPort?.getBoundingClientRect();

    const buttonRight = buttonRect.right;
    const buttonLeft = buttonRect.left;
    const buttonLeftOnViewPort = buttonRect.left - viewPortRect?.left;

    const tooltipWidth = this.elements.tooltipLayout.offsetWidth
    const viewportWidth = viewPort.clientWidth


    if (buttonLeftOnViewPort > viewportWidth / 2) {
      tooltip.style.left = `${(buttonLeft + 2) - tooltipWidth}px`
      tooltip.style.top = `${buttonRect.top + 25}px`
    } else {
      tooltip.style.left = `${buttonLeft + 2 }px`
      tooltip.style.top = `${buttonRect.top + 25}px`
    }

    setTimeout(()=>{
      this.openTooltip();
      this.currentTarget = buttonTarget;
    },100)

  }

  closeTooltip() {
    this.isTooltipOpen = false;
    this.elements.tooltipLayout.classList.remove('swym-storefront-layout-show-action-tooltip-view');
  }

}

/**
 * SwymStorefrontLayoutNotification
 * 
 * A Web Component for displaying notifications in the storefront layout. 
 * It supports customizable configurations, auto-hide functionality, 
 * and dynamic content rendering based on user actions.
 * 
 * Features:
 * - Supports various notification types (success, info, etc.).
 * - Configurable options for displaying images, titles, messages, and action buttons.
 * - Auto-hide functionality with configurable duration.
 * - Supports icons and images based on notification type.
 * - Integrates with `SwymStorefrontLayoutContext?.Settings` to check if notifications are enabled.
 * 
 * Dependencies:
 * - `SwymStorefrontLayoutContext`: Provides settings and icon type references.
 * 
 * Usage:
 * ```html
 * <swym-storefront-layout-notification></swym-storefront-layout-notification>
 * ```
 * 
 * Example JavaScript Usage:
 * ```javascript
 * const notification = document.querySelector('swym-storefront-layout-notification');
 * notification.setMessage({
 *   message: 'Item added to wishlist!',
 *   status: 'success',
 *   duration: 4000,
 *   image: 'https://example.com/image.jpg',
 *   action: {
 *     label: 'View Wishlist',
 *     onClick: () => console.log('Wishlist opened')
 *   }
 * });
 * ```
 * 
 * Attributes:
 * - `status` (String) - Defines the notification status (e.g., `success`, `info`, `error`).
 * - `role` (String) - Defaults to `"alert"` for accessibility.
 * 
 * Methods:
 * - `setMessage(data, config)`: Sets notification content and displays it.
 * - `setNotificationConfig(config)`: Merges user-defined configuration with defaults.
 * - `renderUI()`: Updates the UI based on the provided notification data.
 * - `autoHide(duration)`: Automatically hides the notification after a specified duration.
 * - `showNotification()`: Displays the notification.
 * - `hideNotification()`: Hides the notification.
 * 
 * Events:
 * - `click` on `.swym-storefront-layout-notification-action` triggers the provided action callback.
 */
class SwymStorefrontLayoutNotification extends HTMLElement {
  constructor() {
    super();
    this.timeout = null;
    this.notificationData = null;
    this.defaultConfig = {
      showProgress: false,
      showImage: true,
      showActionButton: false,
      showMessage: true,
      showTitle: false
    };

    this.notificationConfig = this.defaultConfig;
  }

  connectedCallback() {
    this.setAttribute('role', this.getAttribute('role') || 'alert');
    this.setAttribute('status', this.getAttribute('status') || 'info');
  }

  setMessage(data, config = {}) {
    const {
      actionType, message, title, status = 'success', duration = 3000, action, image, product, icon, iconType
    } = data;
    
    this.notificationData = {
      actionType, message, status, duration, action, image, product, icon, iconType,
      title: title || product?.dt || null
    };
    
    if (SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutNotification) {
      this.setAttribute('status', status);
      this.setNotificationConfig(config);
      this.renderUI();
      this.autoHide(duration);
    }
  }

  setNotificationConfig(config) {
    this.notificationConfig = { ...this.defaultConfig, ...config };
  }

  renderUI() {
    if (!this.notificationData) return;
    
    const { message, image, iconType, title, action } = this.notificationData;
    const { showProgress, showImage, showActionButton, showMessage, showTitle } = this.notificationConfig;
    
    this.innerHTML = `
      ${showProgress ? '<div class="swym-storefront-layout-notification-progress-bar swym-storefront-notification-animated"></div>' : ''}
      <div class="swym-storefront-layout-notification-container">
        <div class="swym-storefront-layout-notification-content-container"> 
          ${showImage && (image || iconType) ?`<div class="swym-storefront-layout-notification-image-container">
            ${ image ? `<img class="swym-storefront-layout-notification-image" src="${image}" alt="Notification Icon">` : ''}
            ${iconType ? this.getIconHtml(iconType) : ''}
          </div>`:''}
          <div class="swym-storefront-layout-notification-content">
            ${showTitle && title ? `<div class="swym-storefront-layout-notification-title">${title}</div>` : ''}
            ${showMessage && message ? `<div class="swym-storefront-layout-notification-message">${message}</div>` : ''}
          </div>
        </div>
        ${showActionButton && action ? `<button class="swym-storefront-layout-notification-action">${action.label}</button>` : ''}
      </div>
    `;
    
    if (action) {
      this.querySelector('.swym-storefront-layout-notification-action')?.addEventListener('click', (event) => {
        this.hideNotification();
        action.onClick?.(event);
      });
    }
  }

  getIconHtml(iconType) {
    if (iconType === SwymStorefrontLayoutContext?.NotificationIconType?.SuccessIcon) {
      return `<svg viewBox="0 0 18 18" fill="none" class="swym-storefront-layout-notification-icon" aria-hidden="true">
        <path d="m12.053 5.429-.62.645-3.782 3.98-1.131-1.04-.654-.602-1.152 1.384.661.603 1.745 1.606.613.566 5.553-5.844-1.233-1.298Z" fill="currentColor"></path>
      </svg>`;
    }
    return '';
  }

  autoHide(duration) {
    clearTimeout(this.timeout);
    this.showNotification();
    this.timeout = setTimeout(() => this.hideNotification(), duration);
  }

  showNotification() {
    this.classList.add('swym-storefront-layout-notification-visible');
  }

  hideNotification() {
    this.classList.remove('swym-storefront-layout-notification-visible');
  }
}

/**
 * SwymStorefrontLayoutLoader Web Component
 *
 * This custom element is responsible for rendering different types of loading placeholders 
 * for the storefront layout. The type of loader is determined by the `loadertype` attribute.
 *
 * Supported loader types:
 * - WishlistListItem: Displays skeleton loaders for wishlist items.
 * - CollectionImages: Displays a placeholder for collection images.
 * - CarouselListItem: Displays skeleton loaders for carousel items.
 * - SpinnerLoader: Displays a rotating spinner for loading states.
 *
 * The component listens for attribute changes to control visibility (`loading`) 
 * and size (`width`, `height`).
 *
 * Usage:
 * <swym-storefront-layout-loader loadertype="WishlistListItem" loading="true"></swym-storefront-layout-loader>
 */
class SwymStorefrontLayoutLoader extends HTMLElement {
  constructor() {
    super();

    this.renderLoader();

  }

  renderLoader() {
    const loadertype = this.getAttribute('loadertype');
    const buttonCta = this.getAttribute('buttonCta');

    const loaderListItemHtml = Array.from({ length: 5 })
    .map((_, i) => {
      return `
      <swym-storefront-layout-item class="swym-storefront-layout-loader">
        <div class="swym-storefront-layout-grid-item">
          <div class="swym-storefront-layout-grid-item-image-container">
            <div class="swym-storefront-layout-grid-item-image"></div>
          </div>
          <div class="swym-storefront-layout-grid-item-content">
            <div class="swym-storefront-layout-grid-item-title"></div>
            <div class="swym-storefront-layout-grid-item-price-variant">
            </div>
            <div class="swym-storefront-layout-grid-item-action-container">
              ${buttonCta?`<button class="swym-storefront-layout-grid-item-add-to-cart-button" data-action="add-to-cart">${buttonCta}</button>`:''}
            </div>
          </div>
          
          <div id="swym-storefront-layout-grid-item-option-button" tabindex="-1" class="swym-storefront-layout-grid-item-option-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="currentcolor">
              <circle cx="1.5" cy="1.50014" r="1.5" fill="#B1B7C3"></circle>
              <circle cx="1.5" cy="6.50014" r="1.5" fill="#B1B7C3"></circle>
              <circle cx="1.5" cy="11.5001" r="1.5" fill="#B1B7C3"></circle>
            </svg>
          </div>
        
        </div>
      </swym-storefront-layout-item>
    `;
    })
    .join("");

    if(loadertype === SwymStorefrontLayoutContext?.LoaderViewType.WishlistListItem){
      this.parentElement.innerHTML = `${loaderListItemHtml}`
    }else if(loadertype === SwymStorefrontLayoutContext?.LoaderViewType.CollectionImages){
      this.parentElement.innerHTML = `
        <div class="swym-storefront-layout-loader swym-storefront-layout-collection-list-images"></div>
      `
    }else if(loadertype === SwymStorefrontLayoutContext?.LoaderViewType.CarouselListItem){
      const loaderCollectionListHtml = Array.from({ length: 3 })
                .map((_, i) => {
                  return `
                  <div class="swym-storefront-layout-loader swym-storefront-layout-collection-grid-item">
                    <div class="swym-storefront-layout-collection-grid-item-image-container">
                      
                      <div class="swym-storefront-layout-collection-grid-item-primary-image ">
                        <div class="swym-storefront-layout-collection-grid-item-image"></div>
                      </div>
                    
                      <div class="swym-storefront-layout-collection-grid-item-secondary-image ">
                      <div class="swym-storefront-layout-collection-grid-item-image"></div>
                      </div>
                    
                      <div class="swym-storefront-layout-collection-grid-item-secondary-image ">
                        <div class="swym-storefront-layout-collection-grid-item-image"></div>
                      </div>
                    
                    </div>
                    <div class="swym-storefront-layout-collection-grid-item-info-container">
                      <div>
                        <div class="swym-storefront-layout-collection-grid-item-name"></div>
                        <div class="swym-storefront-layout-collection-grid-item-count"></div>
                      </div>
                      <div class="swym-storefront-layout-collection-grid-item-count"></div>
                    </div>
                    <div id="swym-storefront-layout-collection-grid-item-option-button" class="swym-storefront-layout-collection-grid-item-option-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="none">
                        <circle cx="1.5" cy="1.50014" r="1.5" fill="#B1B7C3"></circle>
                        <circle cx="1.5" cy="6.50014" r="1.5" fill="#B1B7C3"></circle>
                        <circle cx="1.5" cy="11.5001" r="1.5" fill="#B1B7C3"></circle>
                      </svg>
                    </div>
                  </div>
                `;
                })
                .join("");

              this.parentElement.innerHTML = `${loaderCollectionListHtml}`
    }else if(loadertype === SwymStorefrontLayoutContext?.LoaderViewType.SpinnerLoader){
      this.innerHTML = `
      <div class="swym-storefront-layout-loader-container">
        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <path fill="currentColor" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
              <animateTransform 
            <animateTransform 
              <animateTransform 
                attributeName="transform" 
              attributeName="transform" 
                attributeName="transform" 
                attributeType="XML" 
              attributeType="XML" 
                attributeType="XML" 
                type="rotate"
                dur="1s" 
              dur="1s" 
                dur="1s" 
                from="0 50 50"
                to="360 50 50" 
              to="360 50 50" 
                to="360 50 50" 
                repeatCount="indefinite" />
          </path>
        </svg>
      </div>
      `;
    }
  }

  static get observedAttributes() {
    return ['loading', 'width', 'height'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'loading') {
      if (newValue === 'true') {
        this.style.display = 'flex';
      } else {
        this.style.display = 'none';
      }
    } else if (name == 'width') {
      this.style.width = newValue;
    } else if (name == 'height') {
      this.style.height = newValue;
    }
  }
}

/**
 * SwymStorefrontLayoutTitle Web Component
 *
 * This custom element is responsible for rendering the title section of the storefront layout, 
 * including the wishlist title and total item count.
 *
 * Functionality:
 * - Displays the wishlist title using `SwymStorefrontLayoutContext?.Strings?.title`.
 * - Shows the total count of wishlist items retrieved from `SwymStorefrontLayoutContext?.lists`.
 * - Listens for the `WishlistFetched` event and updates the title dynamically when the wishlist is fetched.
 *
 * Usage:
 * <swym-storefront-layout-title></swym-storefront-layout-title>
 */
class SwymStorefrontLayoutTitle extends HTMLElement {
  constructor() {
    super();

    this.renderTitle();

    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.WishlistFetched, () => {
      this.renderTitle();
    })
  }

  renderTitle() {
    const totalCount = SwymStorefrontLayoutContext?.lists?.reduce((total, list) => total + list.listcontents?.length, 0) || 0;
    this.innerHTML = `
    <div>
      <div class="swym-storefront-layout-title">
        ${SwymStorefrontLayoutContext?.Strings?.title} 
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
          <path d="M2.04363 2.00013C4.54368 -0.499876 7.71029 2.33346 8.54363 3.50012C9.21029 2.00012 12.5437 0.500119 14.5437 2.00013C18.6166 5.05486 12.5437 12.0001 8.54363 14.0001C4.04367 11.5001 -1.29179 5.3355 2.04363 2.00013Z" fill="currentColor"/>
        </svg>
      </div>
      ${ totalCount?`<div class="swym-storefront-layout-total-list-items-count" id="swym-storefront-layout-total-list-items-count">${totalCount} ${totalCount<=1? SwymStorefrontLayoutContext?.Strings?.item : SwymStorefrontLayoutContext?.Strings?.items }</div>`:''}
    </div>
    `;
  }

}

/**
 * SwymStorefrontLayoutLoggedUser Web Component
 *
 * This custom element handles user authentication UI within the storefront layout.
 *
 * Functionality:
 * - Checks if a user is logged in using `SwymStorefrontLayoutContext?.isShopperLoggedIn`.
 * - Displays a login prompt if the user is not logged in (when `showLogin="true"`).
 * - Shows a welcome message with the user's name or email (when `showuser="true"`).
 * - Registers a callback in `window.SwymCallbacks` to update UI when Swym state changes.
 * - Tracks login button clicks via `SwymStorefrontLayoutExtensions?.InstrumentActionCodes`.
 *
 * Attributes:
 * - `showuser` (boolean): Determines whether to display logged-in user details.
 * - `showLogin` (boolean): Determines whether to display the login prompt.
 *
 * Usage:
 * <swym-storefront-layout-logged-user showuser="true" showLogin="true"></swym-storefront-layout-logged-user>
 */
class SwymStorefrontLayoutLoggedUser extends HTMLElement {
  constructor() {
    super();
    if (!window.SwymCallbacks) {
      window.SwymCallbacks = [];
    }
    window.SwymCallbacks.push(this.swymCallbackFn.bind(this));
  }

  swymCallbackFn(swat) {
    const showUser = this.getAttribute('showuser') === 'true';
    const showLogin = this.getAttribute('showLogin') === 'true';
    let isUserLogged = SwymStorefrontLayoutContext?.isShopperLoggedIn;

    if (!isUserLogged && showLogin) {
      this.renderLoginContainer();
    } else if (isUserLogged && showUser) {
      this.renderUserDetails();
    }

  }

  handleLoginButtonClick = (event) => {
    event.preventDefault();
    window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutUserLogIn, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
  };

  renderUserDetails() {
    let customer = SwymStorefrontLayoutContext?.SwymCustomerData;
    this.innerHTML = `
      <div class="swym-storefront-layout-logged-user-container"> 
        <div class="swym-storefront-layout-logged-user-welcome-message">${SwymStorefrontLayoutContext?.Strings?.loggedUserWelcomeMessage} <span class="swym-storefront-layout-logged-user-name">${customer?.name ? customer?.name : customer?.email}</span></div>
      </div>
    `
  }

  renderLoginContainer() {
    this.innerHTML = `
      <div class="swym-storefront-layout-login-user-container">
        <div class="swym-storefront-layout-login-content">
          <div class="swym-storefront-layout-login-heading">${SwymStorefrontLayoutContext?.Strings?.loginHeading}</div>
          <div class="swym-storefront-layout-login-description">${SwymStorefrontLayoutContext?.Strings?.loginText}</div>
        </div>
        <a href="${window.location.origin}/account" class="swym-storefront-layout-login-button" onClick={this.handleLoginButtonClick}>
          ${SwymStorefrontLayoutContext?.Strings?.loginButtonText}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M13.8536 4.85368C14.0488 4.65841 14.0488 4.34183 13.8536 4.14657L10.6716 0.964589C10.4763 0.769327 10.1597 0.769327 9.96447 0.964589C9.7692 1.15985 9.7692 1.47643 9.96447 1.6717L12.7929 4.50012L9.96447 7.32855C9.7692 7.52381 9.7692 7.84039 9.96447 8.03566C10.1597 8.23092 10.4763 8.23092 10.6716 8.03566L13.8536 4.85368ZM0.5 5.00012L13.5 5.00012L13.5 4.00012L0.5 4.00012L0.5 5.00012Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    `
  }

}

class SwymStorefrontLayoutTabs extends HTMLElement {
  constructor() {
    super();
    this.elements = {};
    SwymStorefrontLayoutContext.SelectedLayoutView = SwymStorefrontLayoutContext?.Tabs?.[0] || null;
  }

  connectedCallback(){
    this.initUI();
    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.LayoutInitialized, () => {
      SwymStorefrontLayoutContext.Tabs = [SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.Wishlist];
      if(window._swat.retailerSettings.SFL?.SFLFeatureEnabled){
        SwymStorefrontLayoutContext.Tabs.push(SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.SaveForLater);
      }
      this.initUI();
    });
  }

  initUI(){
    this.renderUI();
    this.initElement();

    setTimeout(() => {
      this.setTabSelection(this.elements.currentSelectedTab);
    }, 100);
   
    this.attachEvents();
  }

  renderUI() {
    let tabs = SwymStorefrontLayoutContext?.Tabs;
    if (!tabs?.length || tabs?.length<=1){
      return;
    }
    
    this.innerHTML = `
      <div class="swym-storefront-layout-tabs-view">
        <div class="swym-storefront-layout-tabs">
          ${tabs.map((tab)=>{
            return `<div class="swym-storefront-layout-tab-button ${tab===SwymStorefrontLayoutContext?.SelectedLayoutView?'swym-storefront-layout-tab-button-active':''}" data-view="${tab}">${SwymStorefrontLayoutContext?.Strings?.[tab]}</div>`
          }).join('')}
        </div>
        <div class="swym-storefront-layout-tab-indicator"></div>
      </div>
    `;
  }

  initElement(){
    this.elements = {
      tabs: this.querySelectorAll('.swym-storefront-layout-tab-button'),
      tabIndicator: this.querySelector('.swym-storefront-layout-tab-indicator'),
      currentSelectedTab: this.querySelector('.swym-storefront-layout-tab-button-active'),
      tabContent: document.querySelector('swym-storefront-layout-tab-content')
    };
  }

  setTabSelection(selectedTab){
    if (!selectedTab) return;

    const selectedView = selectedTab.getAttribute('data-view');
    if (!selectedView) return;

    SwymStorefrontLayoutContext.SelectedLayoutView = SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.[selectedView] || SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.Wishlist;

    this.elements.tabContainers = this.elements.tabContent?.querySelectorAll('.swym-storefront-layout-tab-container');

    this.elements.tabs?.forEach(tab => tab.classList.toggle('swym-storefront-layout-tab-button-active', tab === selectedTab));
    this.elements.tabContainers?.forEach(tabContainer => tabContainer.classList.toggle('swym-storefront-layout-tab-content-active', tabContainer.id === selectedView))
    
    this.setTabIndicator();
  }

  setTabIndicator(){
    let selectedTab = this.elements.currentSelectedTab;
    if(selectedTab){
    // Wait for next frame to ensure layout is complete
      requestAnimationFrame(() => {
        const tabCenter = selectedTab.offsetLeft + selectedTab.offsetWidth / 2;
        this.elements.tabIndicator?.style.setProperty(
          'left',
          `${tabCenter - (this.elements.tabIndicator.offsetWidth ?? 0) / 2}px`
        );
      })
    }
  }
  
  attachEvents() {
    this.elements.tabs?.forEach((tab) =>
      tab.addEventListener('click', (event) => {
        this.elements.currentSelectedTab = event.target;
        this.setTabSelection(event.target);
      })
    );
    window.addEventListener('resize', SwymStorefrontLayoutContext?.swat?.utils?.debounce(() => {
      this.setTabIndicator();
    }, 200));
  }
}

class SwymStorefrontLayoutTabContent extends HTMLElement {
  constructor() {
    super();
    this.renderUI();
  }

  renderUI() {
    this.innerHTML = `
      <swym-storefront-layout-wishlist-container id="${SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.Wishlist}" class="swym-storefront-layout-tab-container swym-storefront-layout-tab-content-active"></swym-storefront-layout-wishlist-container>
      <swym-storefront-layout-sfl-container id="${SwymStorefrontLayoutContext?.StorefrontLayoutViewType?.SaveForLater}" class="swym-storefront-layout-tab-container"></swym-storefront-layout-sfl-container>
      
    `;
  }
}


class SwymStorefrontLayoutWishlistContainer extends HTMLElement {
  constructor() {
    super();
    this.wishlist = null;
    this.collections = [];
    this.elements = {};
    this.initUI();
    document.addEventListener(
      SwymStorefrontLayoutContext?.CustomEvents?.LayoutInitialized,
      () => {
        this.attachSwymEventListeners(SwymStorefrontLayoutContext?.swat);
      }
    );
    document.addEventListener(
      SwymStorefrontLayoutContext?.CustomEvents?.AsyncApisInitialized,
      () => {
        SwymStorefrontLayoutExtensions?.refreshWishList();
      }
    );
    this.attachEventListner();
  }

  initUI() {
    this.renderUI();
    this.initElement();
  }

  renderUI() {
    const isMultipleList =
      SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection;
    // FIXME - remove repetative code once testing is done
    const isOldControlCentre = !(
      "multiple-wishlist" in (window?.SwymEnabledCommonFeatures || {})
    );
    // Determine the boolean condition based on whether it's the old or new control centre
    const shouldAddToCollection = isOldControlCentre
      ? SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection // For old control centre, use this setting
      : window?.SwymEnabledCommonFeatures?.["multiple-wishlist"]; // For new control centre, use this feature flag

    const isLoggedIn = window._swat?.platform?.isLoggedIn();
    this.innerHTML = `
      <div class="swym-storefront-layout-header">
        <swym-storefront-layout-title></swym-storefront-layout-title>
        ${!shouldAddToCollection && isLoggedIn ? 
          `<button id="swym-storefront-layout-collection-option-button" class="swym-storefront-layout-collection-option-button swym-single-share-wishlist-btn swym-hidden" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-label="Action menu options">
          <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="currentcolor">
            <circle cx="1.5" cy="1.50014" r="1.5" fill="currentColor"></circle>
            <circle cx="1.5" cy="6.50014" r="1.5" fill="currentColor"></circle>
            <circle cx="1.5" cy="11.5001" r="1.5" fill="currentColor"></circle>
          </svg>
        </button>` : ""}
      </div>
      <div class="swym-storefront-layout-body" role="region" aria-label="Wishlist Content Section">
        ${shouldAddToCollection ? `
        <swym-storefront-layout-collection-carousel></swym-storefront-layout-collection-carousel>`: ""}
        <swym-storefront-layout-default-wishlist></swym-storefront-layout-default-wishlist>
        <swym-storefront-layout-collection-list id="swym-storefront-layout-collection-list" role="list" aria-label="Your Wishlist Collections"></swym-storefront-layout-collection-list>
     </div>
    `;
  }

  initElement() {
    this.elements = {
      wishlistListComponent: this.querySelector("swym-storefront-layout-default-wishlist"),
      collectionsCarouselComponent: this.querySelector("swym-storefront-layout-collection-carousel"),
      collectionsListComponent: this.querySelector("swym-storefront-layout-collection-list"),
      swymListActionButton: this.querySelector("#swym-storefront-layout-collection-option-button"),
    };
  }

    attachEventListner(){
    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.WishlistFetched, () => {
      this.wishlist = SwymStorefrontLayoutContext?.DefaultList || null;
      this.collections = SwymStorefrontLayoutContext?.collections || [];
      this.renderWishlistAndCollections();
    })
    this.elements.swymListActionButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.isTooltipOpen && SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.currentTarget === event.target){
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.closeTooltip();
        event.target.setAttribute('aria-expanded', 'false');
      }else{
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
          listId: "",
          list: this.wishlist,
          collections: this.collections,
          actionType: SwymStorefrontLayoutContext?.ActionTypes.ShareSingleWishlist
        });
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.showOnTarget(event.target);
        event.target.setAttribute('aria-expanded', 'true');
      }
    });

  }
  attachSwymEventListeners(swat) {
    swat?.evtLayer?.addEventListener(
      swat?.JSEvents?.storeAddedToCart,
      (data) => {
        swat.utils.debounce(() => {
          this.renderWishlistAndCollections();
        }, 1000)();
      }
    );

    swat?.evtLayer?.addEventListener(
      swat?.JSEvents?.storeRemovedFromCart,
      (data) => {
        swat.utils.debounce(() => {
          this.renderWishlistAndCollections();
        }, 1000)();
      }
    );
  }

  // Add this function to SwymStorefrontLayoutWishlistContainer class
  mergeWishlists() {
    // Get all products from all collections/wishlists
    const allProducts = [];
    if (
      window.SwymStorefrontLayoutContext.allLists &&
      window.SwymStorefrontLayoutContext.allLists.length > 0
    ) {
      window.SwymStorefrontLayoutContext.allLists.forEach((collection) => {
        if (collection.listcontents && collection.listcontents.length) {
          // Add products from each collection, avoiding duplicates
          collection.listcontents.forEach((product) => {
            const isDuplicate = allProducts.some(
              (p) => p.empi === product.empi && p.epi === product.epi
            );
            if (!isDuplicate) {
              allProducts.push(product);
            }
          });
        }
      });
    }

    // Update default wishlist with merged products
    if (this.wishlist) {
      this.wishlist.listcontents = allProducts;
    } else {
      this.wishlist = {
        lid: SwymStorefrontLayoutContext?.DefaultList?.lid,
        listcontents: allProducts,
      };
    }

    // Update context
    SwymStorefrontLayoutContext.DefaultList = this.wishlist;
  }

  // Modify the renderWishlistAndCollections method to handle the switch
  renderWishlistAndCollections() {
    const isOldControlCentre = !('multiple-wishlist' in (window?.SwymEnabledCommonFeatures || {}));
    // Determine if we should show multiple wishlists
    const shouldShowMultiple = isOldControlCentre
      ? SwymStorefrontLayoutContext?.Settings?.EnableStorefrontLayoutCollection
      : window?.SwymEnabledCommonFeatures?.['multiple-wishlist'];

    // If switching from multiple to single view, merge the wishlists
    if (!shouldShowMultiple && window.SwymStorefrontLayoutContext?.allLists?.length > 0) {
      this.mergeWishlists();
    }

    if(this.collections?.length > 0 || (this.wishlist && this.wishlist?.listcontents?.length > 0)) {
      this.querySelector("#swym-storefront-layout-collection-option-button")?.classList.remove('swym-hidden');
    }
    if ( this.wishlist || this.collections) {
      if(window.location.hash.startsWith(SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.CollectionList)){
        const collectionId = window.location.hash.slice(SwymStorefrontLayoutContext?.StorefrontLayoutUrls?.CollectionList.length);
        if(this.elements.collectionsListComponent && this.collections){
          let selectedCollection = this.collections?.find((collection)=> collection.lid === collectionId);
          this.elements.collectionsListComponent.setData({ list: selectedCollection, collections: this.collections })
        }
      }

      this.elements.wishlistListComponent?.setData({ 
        wishlist: shouldShowMultiple ? this.wishlist : SwymStorefrontLayoutContext.DefaultList, 
        collections: this.collections 
      });

      if (shouldShowMultiple && this.elements.collectionsCarouselComponent && this.collections) {
        this.elements.collectionsCarouselComponent?.setData({ collections: this.collections });
      }
    }
  }
}

class SwymStorefrontLayoutSaveForLaterContainer extends HTMLElement{
  constructor(){
    super();
    this.sflData = null;
    this.collections = [];
    this.elements = {};

    this.initUI();

    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.AsyncApisInitialized, () => {
      if(window._swat?.retailerSettings.SFL?.SFLFeatureEnabled){
        this.initSfl();
      }
    })

    this.attachEventListner();
  }

  initUI(){
    this.renderUI();
    this.initElement();
  }

  renderUI(){
    const isLoggedIn = window?._swat?.platform?.isLoggedIn();
    this.innerHTML = `
      <div class="swym-storefront-layout-header">
        <swym-storefront-layout-sfl-title></swym-storefront-layout-sfl-title>
        ${isLoggedIn ?
        `<div id="swym-storefront-layout-collection-option-button" class="swym-storefront-layout-collection-option-button swym-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="3" height="13" viewBox="0 0 3 13" fill="currentcolor">
            <circle cx="1.5" cy="1.50014" r="1.5" fill="currentColor"></circle>
            <circle cx="1.5" cy="6.50014" r="1.5" fill="currentColor"></circle>
            <circle cx="1.5" cy="11.5001" r="1.5" fill="currentColor"></circle>
          </svg>
        </div>` : ""
        }
      </div>
      <div class="swym-storefront-layout-body">
        <swym-storefront-layout-sfl-list></swym-storefront-layout-sfl-list>
      </div>
    `;
  }

  initElement(){
    this.elements = {
      sflList: this.querySelector('swym-storefront-layout-sfl-list'),
      swymListActionButton: this.querySelector('#swym-storefront-layout-collection-option-button')
    }
  }

  async initSfl(){
    if(!SwymStorefrontLayoutContext?.sflListId){
      await SwymStorefrontLayoutAPI?.SwymSFLAsyncApis.initSFL();
      window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutSFLInitialized, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
    }

    if(!SwymStorefrontLayoutContext?.sflList){
      SwymStorefrontLayoutExtensions?.refreshSFLList();
    }
    if(SwymStorefrontLayoutContext?.sflList) {
      this.querySelector("#swym-storefront-layout-collection-option-button")?.classList.remove("swym-hidden");
    } 
  }
  attachEventListner(){
    this.elements.swymListActionButton?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if(SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.isTooltipOpen && SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.currentTarget === event.target){
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.closeTooltip();
      }else{
        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.setData({
          listId: SwymStorefrontLayoutContext?.sflListId,
          list: "",
          collections: "",
          actionType: SwymStorefrontLayoutContext?.ActionTypes.ShareSingleWishlist
        });

        SwymStorefrontLayoutExtensions?.SwymStorefrontLayoutActionTooltip?.showOnTarget(event.target);
      }
    });

  }
}

class SwymStorefrontLayoutSaveForLaterTitle extends HTMLElement {
  constructor() {
    super();

    this.renderTitle();

    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.SavedForLaterFetched, () => {
      this.renderTitle();
    })
  }

  renderTitle() {
    const totalCount = SwymStorefrontLayoutContext?.sflListItems?.length || 0;
    this.innerHTML = `
    <div>
      <div class="swym-storefront-layout-title">
        ${SwymStorefrontLayoutContext?.Strings?.savedForLaterTitle}
      </div>
      ${ totalCount?`<div class="swym-storefront-layout-total-list-items-count" id="swym-storefront-layout-total-list-items-count">${totalCount} ${totalCount<=1? SwymStorefrontLayoutContext?.Strings?.item : SwymStorefrontLayoutContext?.Strings?.items }</div>`:''}
    </div>
    `;
  }

}
class SwymStorefrontLayoutSaveForLaterList extends HTMLElement {
  constructor() {
    super();
    this.renderUI();
    document.addEventListener(SwymStorefrontLayoutContext?.CustomEvents?.SavedForLaterFetched, () => {
      this.renderSFL();
    })
  }

  renderUI() {
    let sflData = SwymStorefrontLayoutContext?.sflData || null;
    this.innerHTML = `
      <div id="swym-storefront-layout-items-container" class="swym-storefront-layout-items-container swym-storefront-layout-sfl-list-container">
        ${sflData===null?`<swym-storefront-layout-loader loading="true" loadertype="${SwymStorefrontLayoutContext?.LoaderViewType?.WishlistListItem}" buttonCta="${SwymStorefrontLayoutContext?.Strings?.moveToCartCta}" height="100px"></swym-storefront-layout-loader>`:''}
      </div>
    `
    this.initElements();
  }

  initElements(){
    this.elements = {
      title: this.querySelector('.swym-storefront-layout-sfl-list-title'),
      itemsContainer: this.querySelector('#swym-storefront-layout-items-container')
    }
  }


  async renderSFL() {
    const slfListItems =  SwymStorefrontLayoutContext?.sflListItems;
    if (slfListItems?.length && this.elements.itemsContainer) {
      
      const fragment = document.createDocumentFragment();

      slfListItems.forEach((item) => {
        const sflItem = document.createElement('template');
        sflItem.innerHTML = `<swym-storefront-layout-item id="swym-storefront-layout-sfl-item-${item.empi}-${item.epi}" class="swym-storefront-layout-sfl-item"></swym-storefront-layout-item>`;
        fragment.appendChild(sflItem.content);
      });
      
      this.elements.itemsContainer.innerHTML = '';
      this.elements.itemsContainer.appendChild(fragment);

      slfListItems.forEach(async (item) => {
        let sflItemElement = document.querySelector(`#swym-storefront-layout-sfl-item-${item.empi}-${item.epi}`);
        sflItemElement?.setData({
          item,
          listItemType: SwymStorefrontLayoutContext?.ListItemType?.SaveForLaterItem,
          sflList: SwymStorefrontLayoutContext?.sflData?.list
        })
      });
      this.elements.itemsContainer.classList.remove('swym-storefront-layout-items-has-empty');
      window._swat?.instrumentV3(SwymStorefrontLayoutExtensions?.InstrumentActionCodes?.StorefrontLayoutSFLItemsRendered, { "utm-term": SwymStorefrontLayoutExtensions?.InstrumentUtmTerms?.StorefrontLayoutUiEngagement });
    }else{
      this.elements.itemsContainer.innerHTML = `
        <div class="swym-storefront-layout-empty-container">
          <div class="swym-storefront-layout-empty-sfl-container">
            <div class="swym-storefront-layout-empty-sfl-content">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="75" height="75" viewBox="0 0 75 75" fill="none">
                <rect width="75" height="75" fill="url(#pattern0_1065_979)" fill-opacity="0.8"/>
                <defs>
                <pattern id="pattern0_1065_979" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_1065_979" transform="scale(0.00195312)"/>
                </pattern>
                <image id="image0_1065_979" width="512" height="512" preserveAspectRatio="none" xlink:href="data:image/png;base64,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jzyy8pZbblnwyle+csesA1EqsQAQtNZnmTABEGABuOOOOxLzzvr222/H6aefjqc85SnSUWZlNk9W5PN5nHPOObjgggswb968CT/m0EWsisUiwjDEI488gvvuuw/33Xcfdu7cuf//12o1a9u2bTcBuGHGgSjVWAAIWusLpDNExeQCEAQBfvrTn0rHmDatNW677bZEFgDf9/GnP/1p2h/f2dmJ888/H+eddx7a22c+GGfbNgYGBjAwMIDnP//5uOOOO/Cd73wHo6NjCwFu3rz5xWABoEOYezak/cIw/AvpDFExuQD8+te/jt2s/6k8+OCDCIJAOsaMVSoVhGE4rY8977zz8MEPfhAXX3zxrC7+h3IcB+eddx5uuukmnHvuubAsC4899tj8m2+++S/n/OKUKhwBIIRhOCidISomF4Bmz0jv6OjYf286k8mgWq1idHQU9Xod1WoVO3fuxPbt2+d0jGq1iqGhIZx00klNSh2N6Sz5a9s2XvSiF+Hcc89tSYaOjg5cddVVOPHEE3HLLbfgiSeeeB+A81pyMEokFgBCEARHSWeIiqkFYMeOHTMakp7I/PnzcdZZZ2HZsmVYsmQJFixYMOXnbNmyBffddx/uvfdebNmyZVbHvf/++xNXAKbaRTGfz+O6667DySe3fvXt1atX461vfSu+9KUvnfmWt7zF/uhHPzq9oQlKPRYAw7mumzHlCQDA3AIw24svABx11FF49rOfjdNPP33GyygvXrwYixcvxiWXXIInnngC9913H375y1/OaHGcBx54AFdffXWiVnCcbAIfMFakXve612HJkiWR5Vm6dCle85rX5Ddv3nwFgP+N7MAUaywAhtNa/0Xad2I7EAvA9B133HF49rOfjVNPPbUpF99Fixbh2c9+Ni644ALcfvvtuPXWWzEyMjLl5+3evRsjIyOJ2sJ5sgLQ09ODt73tbUcsCK0yb948zJs37xlgAaBxLACG01qfIp0hSiwAU2tra8NLXvISnHZaaxaHdBwH559/Ps4880x87Wtfw9133z3l5yRtk6Cenp7Dfs9xHFx33XUiF/8DXAzgbyUDUHyYeTak/bTWxkwANHkjoOkWgGOPPRbveMc7WnbxP1BbWxuuueYaXHPNNcjlckf8WM/zWp6nmXp6eg67XXLZZZdh+fLlQon2O65SqZwoHYLigQXAcFrr46QzRMXUiz8A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"/>
                </defs>
              </svg>
              <div class="swym-storefront-layout-empty-sfl-title">${SwymStorefrontLayoutContext?.Strings?.emptySavedForLaterTitle}</div>
              <div class="swym-storefront-layout-empty-sfl-description">${SwymStorefrontLayoutContext?.Strings?.emptySavedForLaterDescription}</div>
              <a class="swym-storefront-layout-empty-sfl-view-cart-button" href="${window.Shopify.routes.root}cart">${SwymStorefrontLayoutContext?.Strings?.viewCartCta}</a>
            </div>
          </div>
        </div>
      `;
      this.elements.itemsContainer.classList.add('swym-storefront-layout-items-has-empty');
    }

  }


}


customElements.define('swym-storefront-layout-as-modal', SwymStorefrontLayoutAsModal);
if(SwymStorefrontLayoutContext?.Settings?.StorefrontLayoutType === 'as-section'){
  customElements.define('swym-storefront-layout-as-section', SwymStorefrontLayoutAsSection);
}
customElements.define('swym-storefront-layout-as-drawer', SwymStorefrontLayoutAsDrawer);
customElements.define('swym-storefront-layout-collection-carousel', SwymStorefrontLayoutCollectionCarousel);
customElements.define('swym-storefront-layout-item', SwymStorefrontLayoutWishlistItem);
customElements.define('swym-storefront-layout-default-wishlist', SwymStorefrontLayoutDefaultWishList);
customElements.define('swym-storefront-layout-collection-list', SwymStorefrontLayoutCollectionList);
customElements.define('swym-storefront-layout-actions', SwymStorefrontLayoutActions);
customElements.define('swym-storefront-layout-action-tooltip', SwymStorefrontLayoutActionTooltip);
customElements.define('swym-storefront-layout-notification', SwymStorefrontLayoutNotification);
customElements.define('swym-storefront-layout-loader', SwymStorefrontLayoutLoader);
customElements.define('swym-storefront-layout-login-user', SwymStorefrontLayoutLoggedUser);
customElements.define('swym-storefront-layout-title', SwymStorefrontLayoutTitle);
customElements.define('swym-storefront-layout-tabs', SwymStorefrontLayoutTabs);
customElements.define('swym-storefront-layout-tab-content', SwymStorefrontLayoutTabContent);
customElements.define('swym-storefront-layout-wishlist-container', SwymStorefrontLayoutWishlistContainer);
customElements.define('swym-storefront-layout-sfl-container', SwymStorefrontLayoutSaveForLaterContainer);
customElements.define('swym-storefront-layout-sfl-title', SwymStorefrontLayoutSaveForLaterTitle);
customElements.define('swym-storefront-layout-sfl-list', SwymStorefrontLayoutSaveForLaterList);
})();
