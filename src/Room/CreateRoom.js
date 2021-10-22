function CreateRoom({ createRoomHandler }) {
  return (
    <div>
      <h3>Create a Room</h3>
      <p>
        Once created, you will be given a room code which you can share with a
        friend to join.
      </p>
      <button onClick={createRoomHandler}>Create</button>
    </div>
  );
}

export default CreateRoom;
