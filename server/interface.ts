interface IUser {
  id: string;
  username: string;
  password: string;
  authority: string;
}

interface IStudent {
  id: string;
  studentNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  parentPhone: string;
  address: string;
}

interface ITeacher {
  id: string;
  teacherNum: string;
  name: string;
  sex: string;
  age: number;
  phone: string;
  address: string;
  issueDate: string;
  fullTime: boolean;
}
