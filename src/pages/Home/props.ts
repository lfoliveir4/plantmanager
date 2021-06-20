export interface HomeProps {}

export interface PlantsEnvironmentsProps {
  key: string;
  title: string;
}

export interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
}
