friend_permissions = [
  'friends_about_me'
  'friends_activities'
  'friends_birthday'
  'friends_checkins'
  'friends_education_history'
  'friends_events'
  'friends_groups'
  'friends_hometown'
  'friends_interests'
  'friends_likes'
  'friends_location'
  'friends_notes'
  'friends_online_presence'
  'friends_photo_video_tags'
  'friends_photos'
  'friends_relationships'
  'friends_relationship_details'
  'friends_religion_politics'
  'friends_status'
  'friends_videos'
  'friends_website'
  'friends_work_history'
]

deepLog = (obj) ->
  msg = ''
  for own key, val of obj
    val = deepLog val if typeof val == 'object'
    msg += "#{key}: #{val}"

sellOutFriend = (friend) ->
  FB.api "/#{friend.id}", (response) ->
    console.log "Got data for '#{friend.name}'",deepLog(response)

pluckFriend = () ->
  idx = parseInt( Math.random() * window.friends2.length )
  friend = window.friends2[idx]
  delete window.friends2[idx]
  friend
  

login = (response) ->
  console.log 'got perms',response
  if response.session
    FB.api '/me/friends', (response) ->
      friends = response.data
      # console.log 'got friends',friends
      window.friends2 = friends
      
      pluckAndSellFriend = () ->
        if window.friends2.length > 0
          friend = pluckFriend()
          sellOutFriend friend
          setTimeout( pluckAndSellFriend, 3000 )
      
      pluckAndSellFriend()
      
  
window.start = () ->
  console.log 'start!'
  $('#clickme').click (e) ->
    console.log 'clicked'
    FB.login login, perms: friend_permissions.join(',')
    e.preventDefault()
    