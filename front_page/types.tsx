export type Todo = {
  id: string;
  content: string;
  user_id: number;
  team_code: number;
  completed: boolean;
  //checked: boolean;
};
export type TodoCategory = "All" | "Team" | "Personal";

export type Post = {
  id: number;
  header: number;
  title: string;
  author_id: number;
  author_name: string;
  created: string;
  updated: string;
  content: string;
  permission: number;
  is_notice: false;
  board_id: number;
};

export type Reply = {
  id: number;
  content: string;
  created: string;
  updated: string;
  post_id : number;
  user_id : string;
  parent: any;
  is_deleted: boolean;

};

export type User = {
  id: any;
  name: string; // 이름
  google_id : string;
  email: string;
  phone : string;
  team: string; // 소속
  status : boolean;
  semester: number; //기수(논의필요)
  team_code : number;
  permission : number;
  profile_message?: string; //profile message
  image?: string; //profile image(논의필요)
};

export type Event = {
  id: number;
  user_id : number;
  title: string;
  content: string;
  team_code: number;
  start: string;
  end: string;
  alarm?: string;
};

export interface Member {
  id: number;
  profileImage?: string;
  name: string;
  semester: number;
  team: string;
  phone: string;
  profile_message: string;
};
