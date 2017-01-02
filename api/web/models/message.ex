defmodule Sling.Message do
  use Sling.Web, :model

  schema "messages" do
    field :text, :string
    belongs_to :room, Sling.Room
    belongs_to :user, Sling.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:text, :user_id, :room_id])
    |> validate_required([:text, :user_id, :room_id])
  end
end
