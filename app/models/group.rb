class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  def show_last_message
    if (last_message = messages.last).present?
      last_message.comment? ? last_message.comment : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
