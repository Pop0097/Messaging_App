import React from "react";

function UserCard({ user }) {
  return (
    <View>
        <Text>Result: {user.email}</Text> 
    </View>
  );
}

export default UserCard;