'use strict';

describe('auctionApp.signup module', function() {

  beforeEach(module('auctionApp.signup'));

  describe('signup controller', function(){

    it('should inject controller', inject(function($controller) {
      //spec body
      var signUpCtrl = $controller('SignUpCtrl');
      expect(signUpCtrl).toBeDefined();
    }));

  });
});