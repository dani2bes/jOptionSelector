jOptionSelector
===============

JQuery plugin to display configurable options

-Configuration (Optional)

The plugin comes with a default configuration that can be overridden.

        defaultPrefs: {
            onPreviousOptClick:function(){},
            onNextOptClick: function(){},
            onOptionChange: function(){},
            options: ["option1","option2","option3","option4"],
            selectedOption:"option1"
        }

-How to use it:

<div class="opt-selection">
</div>

var optsSelector=$("div.opt-selection").jOptionSelector({
    onPreviousOptClick:function(){
        alert("back");
    },
    onNextOptClick:function(){
        alert("next");
    },
    onOptionChange:function(){
        alert("changed");
    },
    options:["apple", "orange", "melon", "pear"],
    selectedOption:"orange"
});

-Getter methods

Once the plugin is instantiated, their getter methods can be invoked.

var qtyTest=qtySelector.jQuantitySelector('getQuantity');
alert(qtyTest);
