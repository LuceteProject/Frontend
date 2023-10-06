export type Todo = {
  id: string;
  content: string;
  userId: number;
  teamCode: number;
  completed: boolean;
  //checked: boolean;
};
export type TodoCategory = "All" | "Team" | "Personal" | "Graduated";

export type Post = {
  id: number;
  title: string;
  created: string;
  updated: string;
  content: string;
  permissionCode: number;
  isNotice: boolean;
  boardId: number;
  teamCode: number;
  userId: number;
};

export type user = {
  id: number;
  name: string; // 이름
  googleId? : string;
  naverId?: string;
  email: string;
  phone : string;
  passwodrd : string;
  semester: number; //기수(논의필요)
  teamCode : number; //소속
  attManager: boolean;
  created : string;
  updated: string;
  permissionCode : number;
  profileMessage?: string; //profile message
  profileImage?: string; //profile image(논의필요)
};

export type conmments = {
  id: number;
  postId: number;
  userId: number;
  content: string;
  created: string;
  updated: string;
  parent: number;
  isDeleted: boolean;
};

export type attendances = {
  id: number;
  userId: number;
  point: number;
  date: string;
};

export type schedules = {
  id: number;
  userId: number;
  title: string;
  content: string;
  start: string;
  end: string;
  alarm: string;
  teamCode: number;
};

export type boards = {
  id: number;
  name: string;
  permissionCode: number;
};