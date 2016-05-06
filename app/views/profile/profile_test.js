'use strict';

describe('auctionApp.profile module', function() {

  beforeEach(module('auctionApp.profile'));

  describe('profile controller', function(){

    it('should inject controller', inject(function($controller) {
      //spec body
      var profileCtrl = $controller('ProfileCtrl');
      expect(profileCtrl).toBeDefined();
    }));

  });
});