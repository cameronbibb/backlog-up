class RefreshToken < ApplicationRecord
  belongs_to :user

  validates :token, presence: true
  validates :expires_at, presence: true

  def expired?
    expires_at < Time.current
  end

  def active?
    !revoked? && !expired?
  end

  def revoke!
    update!(revoked: true)
  end
end
