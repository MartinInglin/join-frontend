const columns = ["Todo", "InProgress", "AwaitFeedback", "Done"];
let dataTasks = [
  {
    id: "timestamp",
    position: "Todo",
    category: "User Story",
    title: "Hier ist eine User Story",
    task: "Das ist der erste Task",
    subtasks: [
      {
        content: "Ein Subtask ensteht hier",
        checked: false,
      },
    ],
    assignedTo: [],
    urgency: "urgent",
    date: "mm.dd.yyyy",
  },
  {
    id: "timestamp",
    position: "InProgress",
    category: "Technical Task",
    title: "Hier ist ein technischer Task",
    task: "Baue eine neue schöne Kochweltseite",
    subtasks: [],
    assignedTo: [],
    urgency: "urgent",
    date: "mm.dd.yyyy",
  },
  {
    id: "timestamp",
    position: "AwaitFeedback",
    category: "User Story",
    title: "Kochwelt Rezepte",
    task: "Baue eine neue schöne Kochweltseite",
    subtasks: [
      {
        content: "Ein Subtask ensteht hier",
        checked: true,
      },
      {
        content: "Ein Subtask ensteht hier",
        checked: true,
      },
      {
        content: "Ein Subtask ensteht hier",
        checked: false,
      },
    ],
    assignedTo: [],
    urgency: "urgent",
    date: "mm.dd.yyyy",
  },
  {
    id: "timestamp",
    position: "Todo",
    category: "User Story",
    title: "Kochwelt Rezepte",
    task: "Baue eine neue schöne Kochweltseite",
    subtasks: [
      {
        content: "Ein Subtask ensteht hier",
        checked: false,
      },
    ],
    assignedTo: [],
    urgency: "urgent",
    date: "mm.dd.yyyy",
  },
];
