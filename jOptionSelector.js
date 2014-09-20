(function (window, $) {
    var JQUERY_PLUGIN_NAME='jOptionSelector';
    var _options;
    var _selectedOptionIndx;
 
    function _callIfSet(callback){
        if(callback!==undefined)
            callback();
    }
    
    
    function _updateContent($elem,callback){
        var $content=$elem.children("span.selOpt");
        $content.fadeOut("fast",function(){
            $content.html(_options[_selectedOptionIndx]).fadeIn("fast",callback);
        });
    }
    

    function _shiftRightIndex(){
        _selectedOptionIndx++;
        if(_selectedOptionIndx > _options.length-1)
            _selectedOptionIndx=0;
    }


    function _shiftLeftIndex(){
        _selectedOptionIndx--;
        if(_selectedOptionIndx < 0)
            _selectedOptionIndx=_options.length-1;
    }

    function _previousOption($elem,config){
        _shiftLeftIndex();
        _updateContent($elem,config.onOptionChange);
        _callIfSet(config.onPreviousOptClick);
    }
    
    function _nextOption($elem,config){
         _shiftRightIndex();
         _updateContent($elem,config.onOptionChange);
         _callIfSet(config.onNextOptClick);
    }
    
    function _isEmptyOrConfigObj(prefs){
       if (prefs === undefined || typeof prefs === 'object') 
           return true;
        return false;
    }
    
    function _isPluginInstanceStoreOnElementData($elem){
         if ($.data($elem, JQUERY_PLUGIN_NAME))
             return true;
        return false;
    }
    
    function _storePluginInstanceInElem($elem,instance){
        $.data($elem, JQUERY_PLUGIN_NAME, instance);
    }
    
    function _getPluginInstanceFrom($elem){
         return $.data($elem, JQUERY_PLUGIN_NAME);
    }
    
    function _isTypeString(prefs){
        if(typeof prefs === 'string')
            return true;
        return false;
    }

    function hasPrivateMemberPrefix(prefs){
        if(prefs[0] !== '_')
            return true;
        return false;
    }
    
    function _isMethod(prefs){
        if (_isTypeString(prefs) && hasPrivateMemberPrefix(prefs)  && prefs !== 'init') 
            return true;
        return false;
    }
    
    function _isGetterMethod(prefs,getters){
         if($.inArray(prefs, getters) != -1)
             return true;
        return false;
    }
    
    
    function _createConfig(defPrefs,prefs){
         return $.extend({}, defPrefs, prefs);
    }
    
    function _getSelectedOptionIndex(config){
        var optIndx = config.options.indexOf(config.selectedOption);
        if(optIndx==-1){
            console.log("selected option not in options array...taking 0 index");
            optIndx=0;          
        }
        return optIndx;
    }

    function _initPrivateAttrs(config){
        _options = config.options;
        _selectedOptionIndx = _getSelectedOptionIndex(config);
    }
    
    function _createDomWithin($elem){
        $elem.append("<button class='previous'>&dash;</button>");
        $elem.append("<span class='selOpt'></span>");
        $elem.append("<button class='next'>&plus;</button>");
    }
    
    function _setPreviousOptClickHandler($elem,config){
        var $leftArrow = $elem.children("button.previous");
        $leftArrow.click(function(){
            _previousOption($elem,config);           
        }); 
    }
    
    function _setNextOptClickHandler($elem,config){
        var $rightArrow = $elem.children("button.next");
        $rightArrow.click(function(){
            _nextOption($elem,config);           
        }); 
    }    
    
    function _defineHandlers(config,$elem){
       _setPreviousOptClickHandler($elem,config);
       _setNextOptClickHandler($elem,config);  
    }
    
    var jOptionSelector = function (elem, prefs) {
        this.elem = elem;
        this.$elem = $(elem);
        this.prefs = prefs;
        this.init();
    };

    jOptionSelector.prototype = {
        defaultPrefs: {
            onPreviousOptClick:function(){},
            onNextOptClick: function(){},
            onOptionChange: function(){},
            options: ["option1","option2","option3","option4"],
            selectedOption:"option1"
        },
        init: function () {
            this.config=_createConfig(this.defaultPrefs,this.prefs);
            _initPrivateAttrs(this.config);
            _createDomWithin(this.$elem);
            _updateContent(this.$elem);
            _defineHandlers(this.config,this.$elem);
            return this;
        },
        getSelectedOption:function(){
            return _options[_selectedOptionIndx];
        },
        getters:['getSelectedOption']
    };

    jOptionSelector.getters = jOptionSelector.prototype.getters;
    jOptionSelector.defaultPrefs = jOptionSelector.prototype.defaultPrefs;



    $.fn.jOptionSelector = function (prefs) {
        
        if(_isEmptyOrConfigObj(prefs)){
             return this.each(function () {
                 if(!_isPluginInstanceStoreOnElementData(this)){
                     _storePluginInstanceInElem(this,new jOptionSelector(this, prefs));
                 } 
            });              
        }
        else if(_isMethod(prefs) && _isGetterMethod(prefs,jOptionSelector.getters)){
            var pluginInstance=_getPluginInstanceFrom(this[0]);
            return pluginInstance[prefs].apply(pluginInstance);
        }

    };

    window.jOptionSelector = jOptionSelector;
})(window, jQuery);