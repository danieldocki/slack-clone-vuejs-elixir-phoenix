defmodule Sling.Room do
  use Sling.Web, :model

  schema "rooms" do
    field :name, :string
    field :topic, :string
    many_to_many :users, Sling.User, join_through: "user_rooms"
    has_many :messages, Sling.Message

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :topic])
    |> validate_required([:name])
    |> unique_constraint(:name)
    |> downcase(:name)
  end

  defp downcase(changeset, field) do
    update_change(changeset, field, &String.downcase/1)
  end
end
