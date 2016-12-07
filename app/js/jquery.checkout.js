"use strict";
( function(){

    $( function () {

        $.each( $('.checkout'), function () {

            new LabelForm( $(this) );
            new ProductsInCart( $(this) );

        } );
        $.each( $('.checkout__quantity'), function () {

            new Quantity( $(this) );

        } );

    } );

    var LabelForm = function ( obj ) {

        var _self = this,
            _obj = obj,
            _fields = _obj.find('.checkout__fields'),
            _input = _obj.find('input:not([readonly]), textarea');

        var _addEvents = function () {

                _input.on( {
                    focusin: function() {

                        _addClassOnFocus( $(this) );

                    },
                    focusout: function() {

                        _removeClassOnFocusOut( $(this) );
                        _checkOnEmpty( $(this) );

                    }
                } );

            },
            _addClassOnFocus = function( input ) {

               var field = input,
                   inputParent = field.parent();

                inputParent.addClass('checkout__fields_focus');

            },
            _removeClassOnFocusOut = function( input ) {

                var field = input,
                    inputParent = field.parent();

                inputParent.removeClass('checkout__fields_focus');

            },
            _checkOnEmpty = function ( input ) {

                var field = input,
                    inputParent = field.parent();

                if( !( field.val() == '' ) ) {

                    inputParent.addClass('checkout__fields_focus');

                }

            },
            _init = function() {
                _obj[0].obj = _self;
                _addEvents();

                _input.each( function() {

                    _checkOnEmpty( $(this) );

                } );

            };

        _init();
    };

    var Quantity = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find('input');

        //private methods
        var _addEvents = function () {

                _input.on( {
                    keypress: function () {

                        if ( ( event.which != 46 || $( this ).val().indexOf( '.' ) != -1 ) && ( event.which < 48 || event.which > 57 ) ) {
                            event.preventDefault();
                        }

                    }
                } );
                _input.on( {
                    keyup: function () {

                        if( _input.val() == '' ) {

                            _input.val( 1 );

                        }

                    }
                } );

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var ProductsInCart = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _request = new XMLHttpRequest(),

            //_subTotal = $('.cart-subtotal .amount'),
            //_taxTotal = $('.tax-total .amount'),
            //_total = $('.order-total .amount'),


            _couponWrap = _obj.find('.checkout__coupon'),
            _btnCoupon = _couponWrap.find('.checkout__coupon-send'),
            _inputCoupon = _couponWrap.find('input'),
            _quantity = _obj.find('.checkout__quantity'),
            _inputQuantity = _quantity.find('input'),
            //_discount = $('.my-cart__discount'),
            //_define = $('.my-cart__define'),
            //_applied = $('.my-cart__applied'),
            //_invalid = $('.my-cart__invalid'),
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _btnCoupon.on( {
                    click: function () {

                        var curItem = $(this);

                        if( !( _inputCoupon.val() == '' ) ) {

                                _requestCouponDiscount();


                        } else {

                            _inputCoupon.focus();

                        }


                        return false;

                    }
                } );

                _inputQuantity.on( {
                    keyup: function () {

                        _requestCountChange( $(this) );

                    }
                } );
                _inputQuantity.on( {
                    change: function () {

                        _requestCountChange( $(this) );

                    }
                } );


            },
            _requestCountChange = function ( elem ) {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        action: 'cart_quantity_changes',
                        id: elem.parents('.checkout__order').attr('data-product-id'),
                        key: elem.parents('.checkout__order').attr('data-product-key'),
                        countProduct: elem.val(),
                        flag: 'changeCount'
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {

                        console.log(m);

                    },
                    error: function (XMLHttpRequest) {
                        if ( XMLHttpRequest.statusText != "abort" ) {
                            alert("ERROR!!!");
                        }
                    }
                } );

            },
            _requestCouponDiscount = function () {

                _request.abort();
                _request = $.ajax( {
                    url: $('body').attr('data-action'),
                    data: {
                        action: 'apply_coupon_to_order',
                        inputVal: _inputCoupon.val(),
                        flag: 'coupon'
                    },
                    dataType: 'json',
                    type: "get",
                    success: function (m) {

                        setTimeout( function() {

                            if( m.status == 1 ) {

                                _couponWrap.removeClass('error');
                                _couponWrap.addClass('applied');


                            } else {

                                _couponWrap.addClass('error');

                            }

                        }, 500 );

                    },
                    error: function (XMLHttpRequest) {
                        if ( XMLHttpRequest.statusText != "abort" ) {

                            _couponWrap.addClass('error');

                        }
                    }
                } );

            },
            _init = function () {
                _obj[0].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

} )();