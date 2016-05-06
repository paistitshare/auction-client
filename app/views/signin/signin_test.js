'use strict';

describe('auctionApp.signin module', function() {

  beforeEach(module('auctionApp.signin'));

  describe('signin controller', function(){

    it('should inject controller', inject(function($controller) {
      //spec body
      var signInCtrl = $controller('SignInCtrl');
      expect(signInCtrl).toBeDefined();
    }));

  });
});