export interface OrgPerson {
  id: string;
  name: string;
  title: string;
  employeeNumber?: string;
  hasLink?: boolean;
  imageUrl?: string;
  subordinates?: OrgPerson[];
}

export interface OrgChartData {
  root: OrgPerson;
}
