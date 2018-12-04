## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|comment|string|
|image|string|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|

- その他はdeviseにて生成

### Association
- has_many :messages
- has_many :members
- has_many :groups through: :members


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :members
- has_many :users through: :members


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
