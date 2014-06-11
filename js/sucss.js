(function($) {

	//
	// Topbar
	//
	$.fn.topbar = function() {
		var maxHeight = 0;
		return this.each(function() {
			var $this = $(this);
			maxHeight = getMaxHeight($this);
			$this.find("[data-toggle]").click(toggleClick);
		});
		function toggleClick(data) {
			var $this = $(this),
				$target = $this.parent().find('> [class*="menu"]');
			$this.toggleClass('active');
			$target.toggleClass('expanded');
			if( $target.hasClass('expanded') ) {
				$target.css({'max-height': maxHeight});
			} else {
				$target.css({'max-height': 0});
			}
		}
		function getMaxHeight($this) {
			var $items = $this.find('> [class*="menu"] a'),
				itemsHeight = 0;
			$items.each(function(index, el) {
				itemsHeight += $(el).outerHeight();
			});
			return itemsHeight;
		}
	};

	//
	// Tabs
	//
	$.fn.tabs = function() {
		return this.each(function() {
			var $root = $(this);
			$(this).find('.tab').keydown(function(e) {
				var display = $root.data('tab-display')
				if (e.which == 13) {
					$(this).click();
				}
				if ( 'horizontal' == display ) {
					// left
					if ( e.which == 37 ) {
						$(this).prev().click();
					}
					// right
					if ( e.which == 39 ) {
						$(this).next().click();
					}
				}
				if ( 'vertical' == display ) {
					// top
					if ( e.which == 38 ) {
						e.preventDefault();
						$(this).prev().click();
					}
					// bottom
					if ( e.which == 40 ) {
						e.preventDefault();
						$(this).next().click();
					}
				}
			});
			$(this).find('.tab').click(function(e) {
				var $tab = $(this),
					$tabs = $(this).siblings(),
					tabID = $(this).attr('id'),
					$panel = $root.find('[aria-labelledby="'+tabID+'"]'),
					$panels = $panel.siblings();
				$tabs.attr('aria-selected', false);
				$tab.attr('aria-selected', true).focus();
				$panels.attr('aria-hidden', true);
				$panel.attr('aria-hidden', false);
			});
		});
	};

	//
	// Accordion
	//
	$.fn.accordion = function() {
		return this.each(function() {
			var $root = $(this);
			var multiselectable = ($root.attr('aria-multiselectable') === "true");
			$(this).find('.accordion-tab').keydown(function(e) {
				if (e.which == 13) {
					$(this).click();
				}
				if (!multiselectable) {
					// top
					if ( e.which == 38 ) {
						e.preventDefault();
						$(this).prev().prev().click();
					}
					// bottom
					if ( e.which == 40 ) {
						e.preventDefault();
						$(this).next().next().click();
					}
				}
			});
			$(this).find('.accordion-tab').click(function(e) {
				var $accordionTab = $(this),
					$accordionTabs = $root.find('.accordion-tab'),
					accordionTabID = $(this).attr('id'),
					$accordionPanel = $root.find('[aria-labelledby="'+accordionTabID+'"]'),
					$accordionPanels = $root.find('.accordion-panel');
				if (!multiselectable) {
					$accordionTabs.attr('aria-selected', false);
					$accordionPanels.attr('aria-hidden', true);
					$accordionTab.attr('aria-selected', true).focus();
					$accordionPanel.attr('aria-hidden', false);
				} else if ( 'true' == $accordionTab.attr('aria-selected')) {
					$accordionTab.attr('aria-selected', false).focus();
					$accordionPanel.attr('aria-hidden', true);
				} else {
					$accordionTab.attr('aria-selected', true).focus();
					$accordionPanel.attr('aria-hidden', false);
				}
			});
		});
	};
})(jQuery);