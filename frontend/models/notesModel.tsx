import React, { Component } from "react";

interface UserNotes {
  title: string;
  content: string;
  date: string;
  color: string;
}

interface State {
  note: UserNotes[];
}

class UserNote extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      note: [
        {
          title: "Work",
          content: "0001",
          date: "China",
          color: "rgba(128, 188, 189, 1)",
        },
        {
          title: "Study",
          content: "0001",
          date: "China",
          color: "rgba(170, 217, 187, 1)",
        },
        {
          title: "Games",
          content: "0001",
          date: "China",
          color: "rgba(213, 240, 193, 1)",
        },
        {
          title: "Games",
          content: "0001",
          date: "China",
          color: "rgba(249, 247, 201, 1)",
        },
      ],
    };
  }
}

export default UserNote;
