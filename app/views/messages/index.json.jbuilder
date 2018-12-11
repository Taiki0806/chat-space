json.array! @new_messages do |message|
  json.comment message.comment
  json.image message.image.url
  json.user_name message.user.name
  json.time message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.id message.id
end
