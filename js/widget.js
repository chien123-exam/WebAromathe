
if (typeof (window) !== 'undefined' && window.performance && window.performance.mark) {
  window.performance.mark('yotpo:loader:loaded');
}
var yotpoWidgetsContainer = yotpoWidgetsContainer || { guids: {} };
(function(){
    var guid = "v6myo2ta2yIYdE7uz944DA9N91sTw02E7GP2OW5Z";
    var loader = {
        loadDep: function (link, onLoad, strategy) {
            var script = document.createElement('script');
            script.onload = onLoad || function(){};
            script.src = link;
            if (strategy === 'defer') {
                script.defer = true;
            } else if (strategy === 'async') {
                script.async = true;
            }
            script.setAttribute("type", "text/javascript");
            script.setAttribute("charset", "utf-8");
            document.head.appendChild(script);
        },
        config: {
            data: {
                guid: guid
            },
            widgets: {
            
                "1074709": {
                    instanceId: "1074709",
                    instanceVersionId: "421870401",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-vugc-media-gallery/app.v0.0.2-7076.js",
                    cssOverrideAssetUrl: "https://staticw2.yotpo.com/widget-assets/VugcMediaGallery/v6myo2ta2yIYdE7uz944DA9N91sTw02E7GP2OW5Z/css-overrides/css-overrides.2025_04_08_12_34_12_029.css",
                    customizationCssUrl: "",
                    customizations: {
                      "albums-ids": [
                        "67d2bff72d6b51d8c1877cb4"
                      ],
                      "instance-id": "62f516a07fec520d2fc24970",
                      "instance-name": "My First Gallery",
                      "load-font-customizations": "view-primary-font, view-secondary-font",
                      "old-widget-class-name": "yotpo yotpo-pictures-widget",
                      "undefined": "Your album source must contain at least 3 photos or videos in order to display your gallery.",
                      "use-es6-module": true,
                      "v2-id-key": "data-gallery-id",
                      "v2-id-value": "62f516a07fec520d2fc24970",
                      "view-background-color": "transparent",
                      "view-card-hover-color": "#1C1D21",
                      "view-primary-color": "#071D49",
                      "view-primary-font": "Open Sans@300|https://staticw2.yotpo.com/web-fonts/css/open_sans/v1/open_sans_300.css",
                      "view-secondary-font": "Open Sans@300|https://staticw2.yotpo.com/web-fonts/css/open_sans/v1/open_sans_300.css",
                      "view-stars-color": "#A39161",
                      "view-text-color": "#6B6D76",
                      "vugc-auto-slide": true,
                      "vugc-carousel-items-per-row": 3,
                      "vugc-carousel-responsive-to-width": false,
                      "vugc-gallery-layout": "carousel",
                      "vugc-gallery-type": "custom",
                      "vugc-header-alignment": "left",
                      "vugc-header-font-size": 22,
                      "vugc-headline-text": "Gallery Title",
                      "vugc-layout": "carousel",
                      "vugc-lightbox-action-button-style": "rounded_filled_rectangle",
                      "vugc-lightbox-action-button-text": "Add to cart",
                      "vugc-lightbox-action-button-type": "Add to cart",
                      "vugc-lightbox-date-format": "MM/DD/YY",
                      "vugc-lightbox-min-star-rating": 4,
                      "vugc-lightbox-show-action-button": "true",
                      "vugc-lightbox-show-caption": "true",
                      "vugc-lightbox-show-date": "false",
                      "vugc-lightbox-show-star-rating": true,
                      "vugc-lightbox-tagged-products-text": "Tagged products",
                      "vugc-media-portrait-mode": false,
                      "vugc-on-site-upload-btn-style": "filled_capsule",
                      "vugc-on-site-upload-btn-text": "Add your own",
                      "vugc-on-site-upload-enabled": false,
                      "vugc-show-header": false,
                      "vugc-show-slider-arrow": true,
                      "vugc-slide-speed": "medium",
                      "vugc-slides-spacing": "small",
                      "vugc-video-hover-action": "play"
                    },
                    staticContent: {
                      "feature_ab_tests": "disabled",
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "enabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_privacy_policy_consent": "disabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_disable_shopper_side_cookies": "disabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "disabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "disabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "enabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzfsqoo66510cAjeFJvJacQ3SNrnSM3xoBDNLnHZRBkMBSNs1dXaplRDOhnkmy8g5u9mD3bMIUq7LkYZMusfnoH",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_terms_and_conditions": "disabled",
                      "feature_translation_cta": "disabled"
                    },
                    className: "VugcMediaGallery",
                    dependencyGroupId: null
                },
            
                "1074137": {
                    instanceId: "1074137",
                    instanceVersionId: "353630565",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-reviews-carousel/app.v0.4.1-7273.js",
                    cssOverrideAssetUrl: "https://staticw2.yotpo.com/widget-assets/ReviewsCarousel/v6myo2ta2yIYdE7uz944DA9N91sTw02E7GP2OW5Z/css-overrides/css-overrides.2025_07_09_12_26_58_166.css",
                    customizationCssUrl: "",
                    customizations: {
                      "load-font-customizations": "view-primary-font, view-secondary-font",
                      "rc-auto-slide": "true",
                      "rc-header-alignment": "center",
                      "rc-headline-text": "What our customers say",
                      "rc-hide-yotpo-branding": "true",
                      "rc-num-of-reviews": 7,
                      "rc-reviews-type": "product",
                      "rc-seo-link-color": "#121212",
                      "rc-seo-link-text": "See all reviews",
                      "rc-seo-link-url": "www.example.com",
                      "rc-show-date": "false",
                      "rc-show-header": "false",
                      "rc-show-product-image": "true",
                      "rc-show-seo-link": "false",
                      "rc-show-slider-arrow": "true",
                      "rc-show-star-rating": "false",
                      "rc-slide-speed": "slow",
                      "view-background-color": "transparent",
                      "view-primary-color": "#071D49",
                      "view-primary-font": "PT Serif@400|https://staticw2.yotpo.com/web-fonts/css/pt_serif/v1/pt_serif_400.css",
                      "view-secondary-font": "Open Sans@300|https://staticw2.yotpo.com/web-fonts/css/open_sans/v1/open_sans_300.css",
                      "view-stars-color": "#A39161",
                      "view-text-color": "#6B6D76"
                    },
                    staticContent: {
                      "feature_ab_tests": "disabled",
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "enabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_privacy_policy_consent": "disabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_disable_shopper_side_cookies": "disabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "disabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "disabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "enabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnwTJD37BF1jykSNBg674QG6AYskXhjqvi9qsTrpuhXhrQ2Bw2Up7ku41hi3afhAY-LsbBQb2jqPlBXshUTt4tkc",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_terms_and_conditions": "disabled",
                      "feature_translation_cta": "disabled"
                    },
                    className: "ReviewsCarousel",
                    dependencyGroupId: null
                },
            
                "1074134": {
                    instanceId: "1074134",
                    instanceVersionId: "421870392",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-reviews-main-widget/app.v0.118.5-7358.js",
                    cssOverrideAssetUrl: "",
                    customizationCssUrl: "",
                    customizations: {
                      "bottom-line-custom-questions-enable": "false",
                      "bottom-line-enable": true,
                      "bottom-line-show-text": true,
                      "bottom-line-text": "Based on {{reviews_count}} reviews",
                      "bundled-products-enable": true,
                      "content-date-enable": true,
                      "content-date-format": "DD/MM/YY",
                      "content-pagination-per-page": 5,
                      "content-pagination-per-page-boldLayout": 9,
                      "default-sorting-order": "Most recent||With media||Rating||Verified purchase",
                      "default-sorting-order-smart-score": "Most relevant||Most recent||With media||Verified purchase||Rating",
                      "empty-state-body-text": "Let us know what you think",
                      "empty-state-button-text": "Be the first to write a review!",
                      "empty-state-enable": "false",
                      "empty-state-title-text": "0 Reviews",
                      "example-background-color": "#3184ed",
                      "feature-reviews-filter-by-media-onsite-enable": "false",
                      "feature-reviews-filter-by-smart-topics-onsite-enable": "true",
                      "feature-reviews-filter-by-star-rating-onsite-enable": "true",
                      "feature-reviews-search-onsite-enable": true,
                      "feature-reviews-smart-topics-minimum": 2,
                      "feature-reviews-sorting-onsite-enable": "true",
                      "feature-reviews-star-distribution-onsite-enable": "true",
                      "grouped-products-enable": false,
                      "incentivized-badge-color": "#121212",
                      "incentivized-badge-details-enable": false,
                      "incentivized-badge-enable": false,
                      "incentivized-badge-title": "Incentivized review",
                      "language-code": "en",
                      "load-font-customizations": "view-primary-font, view-secondary-font",
                      "media-gallery-enable": "true",
                      "media-gallery-headline-text": "Reviews with media",
                      "media-gallery-minimum-images": 5,
                      "mode-show-only-add-review-button": false,
                      "ocean-button-style": 1,
                      "ocean-enable": false,
                      "old-widget-class-name": "yotpo yotpo-main-widget",
                      "onsite-sorting": "",
                      "primary-font-name-and-url": "Montserrat@600|https://staticw2.yotpo.com/web-fonts/css/montserrat/v1/montserrat_600.css",
                      "primary-font-size": "14",
                      "read-only-enable": "false",
                      "reply-title": "Aromatherapy Associates",
                      "reviews-filter-by-bundle-product-enable": false,
                      "reviews-headline-enable": "true",
                      "reviews-headline-text": "Customer Reviews",
                      "reviews-product-custom-questions-color": "#121212",
                      "reviews-product-custom-questions-enable": "true",
                      "reviews-product-custom-questions-filters-enable": "false",
                      "reviews-product-custom-questions-placement": "Right",
                      "reviews-product-variant-enable": false,
                      "reviews-reviewer-country-flag-enable": "false",
                      "reviews-reviewer-custom-questions-enable": "true",
                      "reviews-reviewer-custom-questions-filters-enable": "false",
                      "reviews-show-tab-title": false,
                      "reviews-summary-banner-button-text": "Take me there",
                      "reviews-summary-banner-headline": "A lot to digest?",
                      "reviews-summary-banner-primary-color": "#121212",
                      "reviews-summary-banner-text": "Read an AI-generated summary of recent customer reviews by topic",
                      "reviews-summary-banner-text-color": "#121212",
                      "reviews-summary-banner-toggle-enable": "false",
                      "reviews-summary-toggle-enable": true,
                      "reviews-votes-enable": true,
                      "reviews-votes-text": "Was this review helpful?",
                      "screen-a-header-text": "Hello Live Widget!",
                      "shopper-avatar-enable": "false",
                      "shopper-avatar-enable-boldLayout": "false",
                      "shopper-avatar-format": "icon",
                      "shopper-badge-enable": "true",
                      "shopper-name-format": "firstNameWithInitial",
                      "should-lazy-load": false,
                      "smart-score-sort-enable": "true",
                      "summary-button-style": 2,
                      "summary-button-text": "See reviews summary",
                      "summary-hide-logo-enable": false,
                      "summary-min-star-rating": 4,
                      "summary-show-button-icon": "true",
                      "summary-topic-emoji": "thumbs",
                      "syndication-enable": false,
                      "view-background-color": "transparent",
                      "view-empty-button-color": "#2e4f7c",
                      "view-layout": "standardLayout",
                      "view-line-separator-style": "smooth",
                      "view-primary-color": "#071D49",
                      "view-primary-font": "Open Sans@300|https://staticw2.yotpo.com/web-fonts/css/open_sans/v1/open_sans_300.css",
                      "view-secondary-font": "Open Sans@300|https://staticw2.yotpo.com/web-fonts/css/open_sans/v1/open_sans_300.css",
                      "view-stars-color": "#A39161",
                      "view-text-color": "#6B6D76",
                      "view-widget-width": "100",
                      "white-label-enable": false,
                      "widget-reviews-filter-by-country-enable": false,
                      "widget-reviews-filter-by-product-variants-enable": false
                    },
                    staticContent: {
                      "feature_ab_tests": "disabled",
                      "feature_b_v_syndication": "enabled",
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "enabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_privacy_policy_consent": "disabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_disable_shopper_side_cookies": "disabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "enabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "enabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "enabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzfsqoo66510cAjeFJvJacQ3SNrnSM3xoBDNLnHZRBkMBSNs1dXaplRDOhnkmy8g5u9mD3bMIUq7LkYZMusfnoH",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_rich_snippet": "disabled",
                      "feature_terms_and_conditions": "disabled",
                      "feature_translation_cta": "disabled"
                    },
                    className: "ReviewsMainWidget",
                    dependencyGroupId: null
                },
            
                "1074130": {
                    instanceId: "1074130",
                    instanceVersionId: "421870413",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-vugc-media-gallery/app.v0.0.3-7234.js",
                    cssOverrideAssetUrl: "",
                    customizationCssUrl: "",
                    customizations: {
                      "load-font-customizations": "view-primary-font, view-secondary-font",
                      "use-es6-module": true,
                      "v2-id-key": "data-gallery-id",
                      "view-background-color": "transparent",
                      "view-card-hover-color": "#1C1D21",
                      "view-primary-color": "#2e4f7c",
                      "view-primary-font": "Nunito Sans@700|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_700.css",
                      "view-secondary-font": "Nunito Sans@400|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_400.css",
                      "view-stars-color": "#e7721b",
                      "view-text-color": "#202020",
                      "vugc-auto-slide": false,
                      "vugc-carousel-items-per-row": 6,
                      "vugc-carousel-responsive-to-width": true,
                      "vugc-gallery-layout": "carousel",
                      "vugc-gallery-type": "custom",
                      "vugc-header-alignment": "center",
                      "vugc-header-font-size": 22,
                      "vugc-headline-text": "Media from our community",
                      "vugc-lightbox-action-button-style": "filled_capsule",
                      "vugc-lightbox-action-button-text": "Buy now",
                      "vugc-lightbox-action-button-type": "Go to checkout",
                      "vugc-lightbox-min-star-rating": 4,
                      "vugc-lightbox-show-action-button": true,
                      "vugc-lightbox-show-caption": true,
                      "vugc-lightbox-show-date": true,
                      "vugc-lightbox-show-star-rating": true,
                      "vugc-media-portrait-mode": false,
                      "vugc-on-site-upload-btn-style": "filled_capsule",
                      "vugc-on-site-upload-btn-text": "Add your own",
                      "vugc-on-site-upload-enabled": false,
                      "vugc-show-header": true,
                      "vugc-show-slider-arrow": true,
                      "vugc-slide-speed": "medium",
                      "vugc-slides-spacing": "medium",
                      "vugc-video-hover-action": "play"
                    },
                    staticContent: {
                      "feature_ab_tests": "disabled",
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "enabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_privacy_policy_consent": "disabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_disable_shopper_side_cookies": "disabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "disabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "disabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "enabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzfsqoo66510cAjeFJvJacQ3SNrnSM3xoBDNLnHZRBkMBSNs1dXaplRDOhnkmy8g5u9mD3bMIUq7LkYZMusfnoH",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_terms_and_conditions": "disabled",
                      "feature_translation_cta": "disabled"
                    },
                    className: "VugcMediaGallery",
                    dependencyGroupId: null
                },
            
                "1057227": {
                    instanceId: "1057227",
                    instanceVersionId: "349431227",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-promoted-products/app.v1.1.0-7272.js",
                    cssOverrideAssetUrl: "",
                    customizationCssUrl: "",
                    customizations: {
                      "pp-embedded-mode-enabled": "standalone",
                      "pp-headline-text": "Other recommended products",
                      "pp-num-of-products": 5,
                      "pp-product-name-enabled": true,
                      "pp-product-price-enable": true,
                      "pp-product-stroke-color": "#d7dae4",
                      "view-background-color": "#ffffff",
                      "view-primary-color": "#121212",
                      "view-primary-font": "Nunito Sans@700|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_700.css",
                      "view-secondary-font": "Nunito Sans@400|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_400.css",
                      "view-stars-color": "#e7721b",
                      "view-text-color": "#121212"
                    },
                    staticContent: {
                      "feature_ab_tests": "disabled",
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "enabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_privacy_policy_consent": "disabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_disable_shopper_side_cookies": "disabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "disabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "disabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "enabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzBjPkD9zPwwYeDt5YqcVyBMNj3fRZjl--3C7D8QK46MaT9d1GV04nTHYq-f3ZbaryvpgwN0TCnxHFWSHx95MZ_",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_terms_and_conditions": "disabled",
                      "feature_translation_cta": "disabled"
                    },
                    className: "PromotedProducts",
                    dependencyGroupId: null
                },
            
                "873438": {
                    instanceId: "873438",
                    instanceVersionId: "354846525",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-reviews-star-ratings/app.v0.10.2-7020.js",
                    cssOverrideAssetUrl: "https://staticw2.yotpo.com/widget-assets/ReviewsStarRatingsWidget/v6myo2ta2yIYdE7uz944DA9N91sTw02E7GP2OW5Z/css-overrides/css-overrides.2025_08_12_15_23_44_815.css",
                    customizationCssUrl: "",
                    customizations: {
                      "add-review-enable": false,
                      "bottom-line-click-enable-summary-feature-off": true,
                      "bottom-line-click-enable-summary-feature-on": true,
                      "bottom-line-click-scroll-to": "reviews",
                      "bottom-line-enable-category": false,
                      "bottom-line-enable-product": true,
                      "bottom-line-show-text": true,
                      "bottom-line-text-category": "{{reviews_count}} Reviews",
                      "bottom-line-text-product": "({{reviews_count}})",
                      "empty-state-enable": "false",
                      "load-font-customizations": "view-primary-font",
                      "mutation-section-attribute": "collection",
                      "old-widget-class-name": "yotpo bottomLine",
                      "primary-font-name-and-url": "Montserrat@600|https://staticw2.yotpo.com/web-fonts/css/montserrat/v1/montserrat_600.css",
                      "primary-font-size": "14",
                      "rating-score-enable-category": true,
                      "rating-score-enable-product": "false",
                      "screen-a-header-text": "Hello Live Widget!",
                      "should-watch-mutations": true,
                      "star-rating-highly-rated-topics-background-color": "rgba(0,0,0,0)",
                      "star-rating-highly-rated-topics-text": "Highly rated by customers for:",
                      "star-rating-highly-rated-topics-toggle-enable": "true",
                      "star-rating-highly-rated-topics-topic-color": "#2C2C2C",
                      "star-rating-reviews-summary-text-color": "#2C2C2C",
                      "star-rating-reviews-summary-toggle-enable": "true",
                      "summary-link-text": "See reviews summary",
                      "summary-show-link-icon": "false",
                      "view-alignment-category": "left",
                      "view-alignment-product": "left",
                      "view-preview-catalog-page-html-container": "\u003cdiv class=\"yotpo-demo-store\"\u003e\n    \u003cdiv class=\"yotpo-demo-address-wrapper\"\u003e\n        \u003cdiv class=\"yotpo-demo-top-bar\"\u003e\n            \u003cdiv class=\"yotpo-demo-address-icons\"\u003e\n                \u003csvg class=\"yotpo-demo-address-icon\" width=\"7\" height=\"7\" viewBox=\"0 0 7 7\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003ccircle cx=\"3.5\" cy=\"3.5\" r=\"3.5\" fill=\"#A4A4A4\"/\u003e\n                \u003c/svg\u003e\n                \u003csvg class=\"yotpo-demo-address-icon\" width=\"7\" height=\"7\" viewBox=\"0 0 7 7\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003ccircle cx=\"3.5\" cy=\"3.5\" r=\"3.5\" fill=\"#A4A4A4\"/\u003e\n                \u003c/svg\u003e\n                \u003csvg class=\"yotpo-demo-address-icon\" width=\"7\" height=\"7\" viewBox=\"0 0 7 7\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003ccircle cx=\"3.5\" cy=\"3.5\" r=\"3.5\" fill=\"#A4A4A4\"/\u003e\n                \u003c/svg\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-address-container\"\u003e\n                storename.com\n            \u003c/div\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-demo-store-logo\"\u003e\n            \u003cdiv class=\"yotpo-demo-store-text\"\u003e\n                STORE LOGO\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-product-shopping-bag\"\u003e\n                \u003csvg width=\"16\" height=\"18\" viewBox=\"0 0 16 18\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003cpath\n                            d=\"M3.36842 6V4.28571C3.36842 3.14907 3.81203 2.05898 4.60166 1.25526C5.39128 0.451529 6.46225 0 7.57895 0C8.69565 0 9.76661 0.451529 10.5562 1.25526C11.3459 2.05898 11.7895 3.14907 11.7895 4.28571V6H14.3158C14.5391 6 14.7533 6.09031 14.9112 6.25105C15.0692 6.4118 15.1579 6.62981 15.1579 6.85714V17.1429C15.1579 17.3702 15.0692 17.5882 14.9112 17.7489C14.7533 17.9097 14.5391 18 14.3158 18H0.842105C0.618765 18 0.404572 17.9097 0.246647 17.7489C0.0887215 17.5882 0 17.3702 0 17.1429V6.85714C0 6.62981 0.0887215 6.4118 0.246647 6.25105C0.404572 6.09031 0.618765 6 0.842105 6H3.36842ZM3.36842 7.71429H1.68421V16.2857H13.4737V7.71429H11.7895V9.42857H10.1053V7.71429H5.05263V9.42857H3.36842V7.71429ZM5.05263 6H10.1053V4.28571C10.1053 3.60373 9.8391 2.94968 9.36532 2.46744C8.89155 1.9852 8.24897 1.71429 7.57895 1.71429C6.90893 1.71429 6.26635 1.9852 5.79257 2.46744C5.3188 2.94968 5.05263 3.60373 5.05263 4.28571V6Z\"\n                            fill=\"white\"\n                    /\u003e\n                \u003c/svg\u003e\n            \u003c/div\u003e\n        \u003c/div\u003e\n    \u003c/div\u003e\n    \u003cdiv class=\"yotpo-demo-product-page\"\u003e\n        \u003cdiv class=\"yotpo-product-catalog-wrapper\"\u003e\n                    \u003cdiv class=\"yotpo-demo-product-image\"\u003e\n            \u003cimg class=\"yotpo-demo-product-image-desktop\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/sr_glasses_1.webp\"/\u003e\n   \u003cdiv class=\"yotpo-demo-product-image-mobile\"\u003e\n       \u003c/div\u003e\n      \u003cimg class=\"yotpo-demo-product-image-mobile\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/sr_glasses_1.webp\"/\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-demo-product-data\"\u003e\n            \u003cdiv class=\"yotpo-demo-product-title\"\u003e\n                \u003cdiv class=\"yotpo-demo-product-name\"\u003eProduct name\u003c/div\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-star-rating widget-placeholder-container\"\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-add-to-cart\"\u003e Add to cart\u003c/div\u003e\n        \u003c/div\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-product-catalog-wrapper\"\u003e\n                    \u003cdiv class=\"yotpo-demo-product-image\"\u003e\n            \u003cimg class=\"yotpo-demo-product-image-desktop\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/sr_glasses_2.webp\"/\u003e\n   \u003cdiv class=\"yotpo-demo-product-image-mobile\"\u003e\n       \u003c/div\u003e\n      \u003cimg class=\"yotpo-demo-product-image-mobile\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/sr_glasses_2.webp\"/\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-demo-product-data\"\u003e\n            \u003cdiv class=\"yotpo-demo-product-title\"\u003e\n                \u003cdiv class=\"yotpo-demo-product-name\"\u003eProduct name\u003c/div\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-star-rating widget-placeholder-container\"\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-add-to-cart\"\u003e Add to cart\u003c/div\u003e\n        \u003c/div\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-product-catalog-wrapper\"\u003e\n                    \u003cdiv class=\"yotpo-demo-product-image\"\u003e\n            \u003cimg class=\"yotpo-demo-product-image-desktop\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/sr_glasses_3.webp\"/\u003e\n   \u003cdiv class=\"yotpo-demo-product-image-mobile\"\u003e\n       \u003c/div\u003e\n      \u003cimg class=\"yotpo-demo-product-image-mobile\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/sr_glasses_3.webp\"/\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-demo-product-data\"\u003e\n            \u003cdiv class=\"yotpo-demo-product-title\"\u003e\n                \u003cdiv class=\"yotpo-demo-product-name\"\u003eProduct name\u003c/div\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-star-rating widget-placeholder-container\"\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-add-to-cart\"\u003e Add to cart\u003c/div\u003e\n        \u003c/div\u003e\n        \u003c/div\u003e\n    \u003c/div\u003e\n\u003c/div\u003e",
                      "view-preview-catalog-page-style": ".yotpo-demo-store {\n    display: flex;\n    flex-direction: column;\n    font-family: 'Nunito Sans';\n    min-height: 550px;\n    max-width: 1250px;\n}\n\n.yotpo-demo-address-wrapper {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    background-color: #f4f4f4;\n}\n\n.yotpo-demo-top-bar {\n    display: flex;\n    height: 28px;\n}\n\n.yotpo-demo-address-icons {\n    align-self: center;\n    white-space: nowrap;\n    margin-left:8px;\n    margin-right:8px;\n}\n\n.yotpo-demo-address-icon {\n    cursor: pointer;\n}\n\n.yotpo-demo-address-container {\n    color:#848484;\n    align-self: center;\n    background-color: #FFFFFF;\n    width: 95%;\n    height: 65%;\n    border-radius: 5px;\n    margin: 6px;\n    padding-left: 5px;\n    text-align: start;\n    font-size: 10px;\n    line-height: 20px;\n}\n\n.yotpo-demo-store-logo {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #D6D6D6;\n    color: #FFFFFF;\n    width: 100%;\n    height: 50px;\n}\n\n.yotpo-demo-store-text {\n    line-height: 23px;\n    margin-left: 19px;\n}\n\n.yotpo-demo-product-shopping-bag {\n    display: flex;\n    margin-right: 16px;\n    cursor: pointer;\n}\n\n.yotpo-demo-product-page {\n    display: flex;\n    flex-direction: row;\n    align-self: center;\n    margin-top: 30px;\n}\n\n.yotpo-demo-product-image {\n    opacity: 0.5;\n}\n\n.yotpo-product-catalog-wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: baseline;\n    width: 346px;\n}\n\n.yotpo-demo-product-image-desktop{\n    width:290px;\n    height:300px;\n}\n\n.yotpo-demo-product-image-mobile {\n    display: none;\n    min-height:135px\n}\n\n.yotpo-demo-product-data {\n    display: flex;\n    flex-direction: column;\n    margin-left: 26px;\n    margin-top: 20px;\n width: 83%;\n}\n\n .is-mobile .yotpo-demo-product-data.mobile {\n    display: none;\n}\n\n.yotpo-demo-product-title {\n    display: flex;\n    justify-content: space-between;\n    margin-bottom: 14px;\n    opacity: 0.5;\n    text-align: start;\n    \n}\n\n.yotpo-demo-product-name {\n    font-weight: 700;\n    font-size: 25px;\n    line-height: 22px;\n    color: #2C2C2C;\n    text-align: start;\n    opacity: 0.5;\n    font-family: 'Nunito Sans';\n}\n\n\n.yotpo-demo-star-rating {\n    margin-bottom: 15px;\n}\n\n.yotpo-add-to-cart {\n    width: 75px;\n    height: 20px;\n    border: 1px solid #B4B4B4;\n    font-family: 'Nunito Sans';\n    font-style: normal;\n    font-weight: 700;\n    font-size: 11px;\n    line-height: 125.9%;\n    text-align: center;\n    color: #B4B4B4;\n    padding: 8px;\n    flex-basis: max-content;\n}\n\n.is-mobile .yotpo-demo-store {\n    width: 353px;\n    height: 600px;\n}\n\n.is-mobile .yotpo-demo-address-icons {\n    width: 9%;\n}\n\n.is-mobile .yotpo-demo-product-shopping-bag {\n    margin-right: 16px;\n}\n\n.is-mobile .yotpo-product-catalog-wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 346px;\n}\n\n.is-mobile .yotpo-demo-product-page {\n    flex-direction: column;\n    align-items: center;\n}\n\n.is-mobile .yotpo-demo-product-image {\n    margin-bottom: 23px;\n}\n\n.is-mobile .yotpo-demo-product-image-desktop {\n    display: none;\n}\n\n.is-mobile .yotpo-demo-product-image-mobile {\n    width: 250px;\n    display: unset;\n}\n\n.is-mobile .yotpo-demo-product-data {\n    width: 80%;\n    margin-left:0px\n}\n\n.is-mobile .yotpo-demo-product-title {\n    justify-content: space-between;\n}\n\n.is-mobile .yotpo-demo-star-rating {\n    align-self: start;\n}\n\n.is-mobile .yotpo-demo-product-info {\n    width: 85%;\n}\n\n.is-mobile .yotpo-demo-add-to-bag-btn {\n    width: 188px;\n    opacity: 0.5;\n}",
                      "view-preview-html-container": "\u003cdiv class=\"yotpo-demo-store\"\u003e\n    \u003cdiv class=\"yotpo-demo-address-wrapper\"\u003e\n        \u003cdiv class=\"yotpo-demo-top-bar\"\u003e\n            \u003cdiv class=\"yotpo-demo-address-icons\"\u003e\n                \u003csvg class=\"yotpo-demo-address-icon\" width=\"7\" height=\"7\" viewBox=\"0 0 7 7\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003ccircle cx=\"3.5\" cy=\"3.5\" r=\"3.5\" fill=\"#A4A4A4\"/\u003e\n                \u003c/svg\u003e\n                \u003csvg class=\"yotpo-demo-address-icon\" width=\"7\" height=\"7\" viewBox=\"0 0 7 7\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003ccircle cx=\"3.5\" cy=\"3.5\" r=\"3.5\" fill=\"#A4A4A4\"/\u003e\n                \u003c/svg\u003e\n                \u003csvg class=\"yotpo-demo-address-icon\" width=\"7\" height=\"7\" viewBox=\"0 0 7 7\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003ccircle cx=\"3.5\" cy=\"3.5\" r=\"3.5\" fill=\"#A4A4A4\"/\u003e\n                \u003c/svg\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-address-container\"\u003e\n                storename.com\n            \u003c/div\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-demo-store-logo\"\u003e\n            \u003cdiv class=\"yotpo-demo-store-text\"\u003e\n                STORE LOGO\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-product-shopping-bag\"\u003e\n                \u003csvg width=\"16\" height=\"18\" viewBox=\"0 0 16 18\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\"\n                \u003e\n                    \u003cpath\n                            d=\"M3.36842 6V4.28571C3.36842 3.14907 3.81203 2.05898 4.60166 1.25526C5.39128 0.451529 6.46225 0 7.57895 0C8.69565 0 9.76661 0.451529 10.5562 1.25526C11.3459 2.05898 11.7895 3.14907 11.7895 4.28571V6H14.3158C14.5391 6 14.7533 6.09031 14.9112 6.25105C15.0692 6.4118 15.1579 6.62981 15.1579 6.85714V17.1429C15.1579 17.3702 15.0692 17.5882 14.9112 17.7489C14.7533 17.9097 14.5391 18 14.3158 18H0.842105C0.618765 18 0.404572 17.9097 0.246647 17.7489C0.0887215 17.5882 0 17.3702 0 17.1429V6.85714C0 6.62981 0.0887215 6.4118 0.246647 6.25105C0.404572 6.09031 0.618765 6 0.842105 6H3.36842ZM3.36842 7.71429H1.68421V16.2857H13.4737V7.71429H11.7895V9.42857H10.1053V7.71429H5.05263V9.42857H3.36842V7.71429ZM5.05263 6H10.1053V4.28571C10.1053 3.60373 9.8391 2.94968 9.36532 2.46744C8.89155 1.9852 8.24897 1.71429 7.57895 1.71429C6.90893 1.71429 6.26635 1.9852 5.79257 2.46744C5.3188 2.94968 5.05263 3.60373 5.05263 4.28571V6Z\"\n                            fill=\"white\"\n                    /\u003e\n                \u003c/svg\u003e\n            \u003c/div\u003e\n        \u003c/div\u003e\n    \u003c/div\u003e\n    \u003cdiv class=\"yotpo-demo-product-page\"\u003e\n        \u003cdiv class=\"yotpo-demo-product-image\"\u003e\n            \u003cimg class=\"yotpo-demo-product-image-desktop\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/glasses-image-desktop.webp\"/\u003e\n   \u003cdiv class=\"yotpo-demo-product-image-mobile\"\u003e\n       \u003c/div\u003e\n      \u003cimg class=\"yotpo-demo-product-image-mobile\"\n                 src=\"https://cdn-widgetsrepository.yotpo.com/widget-assets/ReviewsStarRatingsWidget/assets/glasses-image-mobile.webp\"/\u003e\n        \u003c/div\u003e\n        \u003cdiv class=\"yotpo-demo-product-data\"\u003e\n            \u003cdiv class=\"yotpo-demo-product-title\"\u003e\n                \u003cdiv class=\"yotpo-demo-product-name\"\u003eProduct name\u003c/div\u003e\n                \u003cdiv class=\"yotpo-demo-product-price\"\u003e$20\u003c/div\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-star-rating widget-placeholder-container\"\u003e\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-product-info\"\u003e\n                This is a short product description paragraph. It gives a bit more information\nabout the product’s features and benefits.\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-product-more-info\"\u003e\n                more text\n            \u003c/div\u003e\n            \u003cdiv class=\"yotpo-demo-product-buttons\"\u003e\n                \u003cdiv class=\"yotpo-demo-quantity-btn\"\u003e\n                    \u003cdiv\u003e-\u003c/div\u003e\n                    \u003cdiv\u003e1\u003c/div\u003e\n                    \u003cdiv\u003e+\u003c/div\u003e\n                \u003c/div\u003e\n                \u003cdiv class=\"yotpo-demo-add-to-bag-btn\"\u003e\n                    ADD TO BAG\n                \u003c/div\u003e\n            \u003c/div\u003e\n        \u003c/div\u003e\n    \u003c/div\u003e\n\u003c/div\u003e",
                      "view-preview-style": ".yotpo-demo-store {\n    display: flex;\n    flex-direction: column;\n    font-family: 'Nunito Sans';\n    min-height: 550px;\n    max-width: 1250px;\n}\n\n.yotpo-demo-address-wrapper {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    background-color: #f4f4f4;\n}\n\n.yotpo-demo-top-bar {\n    display: flex;\n    height: 28px;\n}\n\n.yotpo-demo-address-icons {\n    align-self: center;\n    white-space: nowrap;\n    margin-left:8px;\n    margin-right:8px;\n}\n\n.yotpo-demo-address-icon {\n    cursor: pointer;\n}\n\n.yotpo-demo-address-container {\n    color:#848484;\n    align-self: center;\n    background-color: #FFFFFF;\n    width: 95%;\n    height: 65%;\n    border-radius: 5px;\n    margin: 6px;\n    padding-left: 5px;\n    text-align: start;\n    font-size: 10px;\n    line-height: 20px;\n}\n\n.yotpo-demo-store-logo {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    background-color: #D6D6D6;\n    color: #FFFFFF;\n    width: 100%;\n    height: 50px;\n}\n\n.yotpo-demo-store-text {\n    line-height: 23px;\n    margin-left: 19px;\n}\n\n.yotpo-demo-product-shopping-bag {\n    display: flex;\n    margin-right: 16px;\n    cursor: pointer;\n}\n\n.yotpo-demo-product-page {\n    display: flex;\n    flex-direction: row;\n    align-self: center;\n    margin-top: 45px;\n}\n\n.yotpo-demo-product-image {\n    opacity: 0.5;\n    margin-right: 14px;\n    min-width: 200px;\n}\n\n.yotpo-demo-product-image-desktop{\n    width:234px;\n    height:297px;\n}\n\n.yotpo-demo-product-image-mobile {\n    display: none;\n    min-height:135px\n}\n\n.yotpo-demo-product-data {\n    display: flex;\n    flex-direction: column;\n    width: 330px;\n    margin-left: 26px;\n}\n\n.yotpo-demo-product-title {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    margin-bottom: 23px;\n    opacity: 0.5;\n}\n\n.yotpo-demo-product-name {\n    font-weight: 700;\n    font-size: 25px;\n    line-height: 22px;\n    color: #2C2C2C;\n    text-align: start;\n    opacity: 0.5;\n}\n\n.yotpo-demo-product-price {\n    font-weight: 400;\n    font-size: 22px;\n    line-height: 22px;\n    color: #2C2C2C;\n    text-align: end;\n    opacity: 0.5;\n}\n\n.yotpo-demo-star-rating {\n    margin-bottom: 23px;\n}\n\n.yotpo-demo-product-info {\n    width: 75%;\n    text-align: start;\n    margin-bottom: 16px;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 17px;\n    color: #2C2C2C;\n    opacity: 0.5;\n}\n\n.yotpo-demo-product-more-info {\n    cursor: pointer;\n    text-align: start;\n    font-weight: 400;\n    font-size: 13px;\n    line-height: 16px;\n    text-decoration-line: underline;\n    color: #2C2C2C;\n    margin-bottom: 75px;\n    opacity: 0.5;\n}\n\n.yotpo-demo-product-buttons {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    opacity: 0.5;\n}\n\n.yotpo-demo-quantity-btn {\n    display: flex;\n    flex-direction: row;\n    width: 75px;\n    height: 33px;\n    border: 1px solid #2C2C2C;\n    box-sizing: border-box;\n    align-items: center;\n    justify-content: space-between;\n    padding: 7px 10px;\n    font-weight: 400;\n    font-size: 16px;\n    line-height: 20px;\n    color: #2C2C2C;\n    cursor: pointer;\n    margin-right: 16px;\n}\n\n.yotpo-demo-add-to-bag-btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 33px;\n    background-color: #2e4f7c;\n    color: #FFFFFF;\n    cursor: pointer;\n    width: 230px;\n    opacity: 0.5;\n}\n\n.is-mobile .yotpo-demo-store {\n    width: 353px;\n    height: 600px;\n}\n\n.is-mobile .yotpo-demo-address-icons {\n    width: 9%;\n}\n\n.is-mobile .yotpo-demo-product-shopping-bag {\n    margin-right: 16px;\n}\n\n.is-mobile .yotpo-demo-product-page {\n    flex-direction: column;\n    align-items: center;\n}\n\n.is-mobile .yotpo-demo-product-image {\n    margin-bottom: 23px;\n}\n\n.is-mobile .yotpo-demo-product-image-desktop {\n    display: none;\n}\n\n.is-mobile .yotpo-demo-product-image-mobile {\n    width: 370px;\n    display: unset;\n}\n\n.is-mobile .yotpo-demo-product-data {\n    width: 80%;\n    margin-left:0px\n}\n\n.is-mobile .yotpo-demo-product-title {\n    justify-content: space-between;\n}\n\n.is-mobile .yotpo-demo-star-rating {\n    align-self: start;\n}\n\n.is-mobile .yotpo-demo-product-info {\n    width: 85%;\n}\n\n.is-mobile .yotpo-demo-add-to-bag-btn {\n    width: 188px;\n    opacity: 0.5;\n}\n",
                      "view-primary-font": "Nunito Sans@300|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_300.css",
                      "view-stars-color": "rgba(163,145,97,1)",
                      "view-text-color-category": "#121212",
                      "view-text-color-product": "rgba(7,29,73,1)"
                    },
                    staticContent: {
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "disabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_highly_rated_topics": "enabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "disabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "disabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_configuration": "",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_text": "Terms \u0026 Conditions",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_text": "I agree to the",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzrJpxcy334Ke41nZe9nTkQ6UKntio1DGAtZn8plfdnoZ-o-ZNwOZDkiyouMCt3Fg3xhrPZyLCNOAEqRU1dCllG",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_terms_and_conditions": "enabled"
                    },
                    className: "ReviewsStarRatingsWidget",
                    dependencyGroupId: null
                },
            
                "873297": {
                    instanceId: "873297",
                    instanceVersionId: "421870424",
                    templateAssetUrl: "https://staticw2.yotpo.com/widget-assets/widget-vugc-media-gallery/app.v0.0.3-7234.js",
                    cssOverrideAssetUrl: "",
                    customizationCssUrl: "",
                    customizations: {
                      "albums-ids": [
                        "62f4f0fc865bf4000148e5d9"
                      ],
                      "load-font-customizations": "view-primary-font, view-secondary-font",
                      "use-es6-module": true,
                      "v2-id-key": "data-gallery-id",
                      "view-background-color": "transparent",
                      "view-card-hover-color": "#1C1D21",
                      "view-primary-color": "#2e4f7c",
                      "view-primary-font": "Nunito Sans@700|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_700.css",
                      "view-secondary-font": "Nunito Sans@400|https://staticw2.yotpo.com/web-fonts/css/nunito_sans/v1/nunito_sans_400.css",
                      "view-stars-color": "#e7721b",
                      "view-text-color": "#202020",
                      "vugc-auto-slide": false,
                      "vugc-carousel-items-per-row": 6,
                      "vugc-carousel-responsive-to-width": true,
                      "vugc-gallery-layout": "carousel",
                      "vugc-gallery-type": "custom",
                      "vugc-header-alignment": "center",
                      "vugc-header-font-size": 22,
                      "vugc-headline-text": "Media from our community",
                      "vugc-lightbox-action-button-style": "filled_capsule",
                      "vugc-lightbox-action-button-text": "Buy now",
                      "vugc-lightbox-action-button-type": "Go to checkout",
                      "vugc-lightbox-min-star-rating": 4,
                      "vugc-lightbox-show-action-button": true,
                      "vugc-lightbox-show-caption": true,
                      "vugc-lightbox-show-date": true,
                      "vugc-lightbox-show-star-rating": true,
                      "vugc-media-portrait-mode": false,
                      "vugc-on-site-upload-btn-style": "filled_capsule",
                      "vugc-on-site-upload-btn-text": "Add your own",
                      "vugc-on-site-upload-enabled": false,
                      "vugc-show-header": true,
                      "vugc-show-slider-arrow": true,
                      "vugc-slide-speed": "medium",
                      "vugc-slides-spacing": "medium",
                      "vugc-video-hover-action": "play"
                    },
                    staticContent: {
                      "feature_filter_by_country": "enabled",
                      "feature_media_gallery_add_to_cart": "enabled",
                      "feature_media_gallery_upload_photos": "enabled",
                      "feature_media_gallery_upload_videos": "enabled",
                      "feature_reviews_bottom_line_syndication": "disabled",
                      "feature_reviews_css_editor": "enabled",
                      "feature_reviews_custom_questions": "enabled",
                      "feature_reviews_filter_by_media": "enabled",
                      "feature_reviews_filter_by_smart_topics": "enabled",
                      "feature_reviews_filter_by_star_rating": "enabled",
                      "feature_reviews_grouped_products": "enabled",
                      "feature_reviews_incentivized_badge": "enabled",
                      "feature_reviews_media_gallery": "disabled",
                      "feature_reviews_ocean": "disabled",
                      "feature_reviews_order_metadata": "disabled",
                      "feature_reviews_photos_and_videos": "enabled",
                      "feature_reviews_product_variant": "disabled",
                      "feature_reviews_search": "enabled",
                      "feature_reviews_smart_sorting": "disabled",
                      "feature_reviews_sorting": "enabled",
                      "feature_reviews_star_distribution": "enabled",
                      "feature_reviews_summary": "enabled",
                      "feature_reviews_summary_filter": "enabled",
                      "feature_reviews_syndication": "enabled",
                      "feature_reviews_trusted_vendors": "disabled",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_configuration": "",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_text": "Terms \u0026 Conditions",
                      "feature_reviews_ugc_widgets_terms_and_conditions_settings_text": "I agree to the",
                      "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzfsqoo66510cAjeFJvJacQ3SNrnSM3xoBDNLnHZRBkMBSNs1dXaplRDOhnkmy8g5u9mD3bMIUq7LkYZMusfnoH",
                      "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                      "feature_reviews_video_support_settings_partner_id": "4778122",
                      "feature_reviews_white_label": "enabled",
                      "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                      "feature_terms_and_conditions": "enabled"
                    },
                    className: "VugcMediaGallery",
                    dependencyGroupId: null
                },
            
            },
            guidStaticContent: {
                      "ugc": {
                        "feature_b_v_syndication": "enabled",
                        "feature_filter_by_country": "enabled",
                        "feature_media_gallery_add_to_cart": "enabled",
                        "feature_media_gallery_upload_photos": "enabled",
                        "feature_media_gallery_upload_videos": "enabled",
                        "feature_reviews_bottom_line_syndication": "disabled",
                        "feature_reviews_css_editor": "enabled",
                        "feature_reviews_custom_questions": "enabled",
                        "feature_reviews_disable_shopper_side_cookies": "disabled",
                        "feature_reviews_filter_by_media": "enabled",
                        "feature_reviews_filter_by_smart_topics": "enabled",
                        "feature_reviews_filter_by_star_rating": "enabled",
                        "feature_reviews_grouped_products": "enabled",
                        "feature_reviews_highly_rated_topics": "enabled",
                        "feature_reviews_incentivized_badge": "enabled",
                        "feature_reviews_media_gallery": "enabled",
                        "feature_reviews_ocean": "disabled",
                        "feature_reviews_order_metadata": "disabled",
                        "feature_reviews_photos_and_videos": "enabled",
                        "feature_reviews_product_variant": "disabled",
                        "feature_reviews_search": "enabled",
                        "feature_reviews_smart_sorting": "enabled",
                        "feature_reviews_sorting": "enabled",
                        "feature_reviews_star_distribution": "enabled",
                        "feature_reviews_summary": "enabled",
                        "feature_reviews_summary_filter": "enabled",
                        "feature_reviews_syndication": "enabled",
                        "feature_reviews_trusted_vendors": "disabled",
                        "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_configuration": "",
                        "feature_reviews_ugc_widgets_terms_and_conditions_settings_link_text": "Terms \u0026 Conditions",
                        "feature_reviews_ugc_widgets_terms_and_conditions_settings_text": "I agree to the",
                        "feature_reviews_video_support_settings_ks": "djJ8NDc3ODEyMnzfsqoo66510cAjeFJvJacQ3SNrnSM3xoBDNLnHZRBkMBSNs1dXaplRDOhnkmy8g5u9mD3bMIUq7LkYZMusfnoH",
                        "feature_reviews_video_support_settings_metadata_profile_id": "18967892",
                        "feature_reviews_video_support_settings_partner_id": "4778122",
                        "feature_reviews_white_label": "enabled",
                        "feature_reviews_widget_v3_settings_enabled_by_onboarding": "false",
                        "feature_rich_snippet": "disabled",
                        "feature_terms_and_conditions": "disabled"
                      }
                    },
            dependencyGroups: {}
        },
        initializer: "https://staticw2.yotpo.com/widget-assets/widgets-initializer/app.v0.9.6-7348.js",
        analytics: "https://staticw2.yotpo.com/widget-assets/yotpo-pixel/2024-04-18_14-53-12/bundle.js"
    }
    
    
    const initWidgets = function (config, initializeWidgets = true) {
        const widgetInitializer = yotpoWidgetsContainer['yotpo_widget_initializer'](config);
        return widgetInitializer.initWidgets(initializeWidgets);
    };
    const initWidget = function (config, instanceId, widgetPlaceHolder) {
        const widgetInitializer = yotpoWidgetsContainer['yotpo_widget_initializer'](config);
        if (widgetInitializer.initWidget) {
            return widgetInitializer.initWidget(instanceId, widgetPlaceHolder);
        }
        console.error("initWidget is not supported widgetInitializer");
    };
    const onInitializerLoad = function (config) {
        const prevInitWidgets = yotpoWidgetsContainer.initWidgets;
        yotpoWidgetsContainer.initWidgets = function (initializeWidgets = true) {
            if (prevInitWidgets) {
                if (typeof Promise !== 'undefined' && Promise.all) {
                    return Promise.all([prevInitWidgets(initializeWidgets), initWidgets(config, initializeWidgets)]);
                }
                console.warn('[deprecated] promise is not supported in initWidgets');
                prevInitWidgets(initializeWidgets);
            }
            return initWidgets(config, initializeWidgets);
        }
        const prevInitWidget = yotpoWidgetsContainer.initWidget;
        yotpoWidgetsContainer.initWidget = function (instanceId, widgetPlaceHolder) {
            if (prevInitWidget) {
              prevInitWidget(instanceId, widgetPlaceHolder)
            }
            return initWidget(config, instanceId, widgetPlaceHolder);
        }
        const guidWidgetContainer = getGuidWidgetsContainer();
        guidWidgetContainer.initWidgets = function () {
            return initWidgets(config);
        }
        guidWidgetContainer.initWidgets();
    };
    function getGuidWidgetsContainer () {
        if (!yotpoWidgetsContainer.guids) {
            yotpoWidgetsContainer.guids = {};
        }
        if (!yotpoWidgetsContainer.guids[guid]) {
            yotpoWidgetsContainer.guids[guid] = {};
        }
        return yotpoWidgetsContainer.guids[guid];
    }

    

    const guidWidgetContainer = getGuidWidgetsContainer();
    guidWidgetContainer.config = loader.config;
    if (!guidWidgetContainer.yotpo_widget_scripts_loaded) {
        guidWidgetContainer.yotpo_widget_scripts_loaded = true;
        guidWidgetContainer.onInitializerLoad = function () { onInitializerLoad(loader.config) };
        
        
        loader.loadDep(loader.analytics, function () {}, 'defer');
        
        
        
        loader.loadDep(loader.initializer, function () { guidWidgetContainer.onInitializerLoad() }, 'async');
        
    }
})()



yotpoWidgetsContainer.yotpoV3 = yotpoWidgetsContainer.yotpoV3 || {
    refreshWidgets: function () {
        if (typeof yotpoWidgetsContainer.initWidgets === 'function') {
            yotpoWidgetsContainer.initWidgets();
        }
        if (typeof yotpo !== 'undefined' && yotpo.v2YotpoLoaded) {
            yotpo.refreshWidgetsV2();
        }
    },
    initWidgets: function () {
        if (typeof yotpoWidgetsContainer.initWidgets === 'function') {
            yotpoWidgetsContainer.initWidgets(false);
        }
        if (typeof yotpo !== 'undefined' && yotpo.v2YotpoLoaded) {
            yotpo.initWidgetsV2();
        }
    },
    allowCookies: function () {
        yotpoWidgetsContainer.yotpoV3.v2Callbacks.push(() => yotpo.allowCookies());
    },
    performV3Logic: function () {
        if (!yotpoWidgetsContainer.yotpoV3.swap) {
            yotpo.refreshWidgetsV2 = yotpo.refreshWidgets;
            yotpo.refreshWidgets = yotpoWidgetsContainer.yotpoV3.refreshWidgets;
            yotpo.initWidgetsV2 = yotpo.initWidgets;
            yotpo.initWidgets = yotpoWidgetsContainer.yotpoV3.initWidgets;
            yotpoWidgetsContainer.yotpoV3.swap = true;
        }
    },
    v2Callbacks: [],
    v2YotpoLoaded: false,
    swap: false,
    analytics: true
};

var Yotpo = Yotpo || {};

Yotpo.API = Yotpo.API || (function () {
    function API(instance) {
        this.instance = instance;
    }

    API.prototype.refreshWidgets = function () {
        this.instance.refreshWidgets()
    }

    return API
})();


var yotpo = yotpo || yotpoWidgetsContainer.yotpoV3

if (yotpo.v2YotpoLoaded) {
    yotpoWidgetsContainer.yotpoV3.performV3Logic();
}


