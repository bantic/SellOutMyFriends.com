/* DO NOT MODIFY. This file was compiled Tue, 26 Jul 2011 23:39:14 GMT from
 * /Users/coryforsyth/Sites/sellout/app/coffeescripts/hello.coffee
 */

(function() {
  var deepLog, friend_permissions, login, pluckFriend, sellOutFriend;
  var __hasProp = Object.prototype.hasOwnProperty;
  friend_permissions = ['friends_about_me', 'friends_activities', 'friends_birthday', 'friends_checkins', 'friends_education_history', 'friends_events', 'friends_groups', 'friends_hometown', 'friends_interests', 'friends_likes', 'friends_location', 'friends_notes', 'friends_online_presence', 'friends_photo_video_tags', 'friends_photos', 'friends_relationships', 'friends_relationship_details', 'friends_religion_politics', 'friends_status', 'friends_videos', 'friends_website', 'friends_work_history'];
  deepLog = function(obj) {
    var key, msg, val, _results;
    msg = '';
    _results = [];
    for (key in obj) {
      if (!__hasProp.call(obj, key)) continue;
      val = obj[key];
      if (typeof val === 'object') {
        val = deepLog(val);
      }
      _results.push(msg += "" + key + ": " + val);
    }
    return _results;
  };
  sellOutFriend = function(friend) {
    return FB.api("/" + friend.id, function(response) {
      return console.log("Got data for '" + friend.name + "'", deepLog(response));
    });
  };
  pluckFriend = function() {
    var friend, idx;
    idx = parseInt(Math.random() * window.friends2.length);
    friend = window.friends2[idx];
    delete window.friends2[idx];
    return friend;
  };
  login = function(response) {
    console.log('got perms', response);
    if (response.session) {
      return FB.api('/me/friends', function(response) {
        var friends, pluckAndSellFriend;
        friends = response.data;
        window.friends2 = friends;
        pluckAndSellFriend = function() {
          var friend;
          if (window.friends2.length > 0) {
            friend = pluckFriend();
            sellOutFriend(friend);
            return setTimeout(pluckAndSellFriend, 3000);
          }
        };
        return pluckAndSellFriend();
      });
    }
  };
  window.start = function() {
    console.log('start!');
    return $('#clickme').click(function(e) {
      console.log('clicked');
      FB.login(login);
      return e.preventDefault();
    });
  };
}).call(this);
