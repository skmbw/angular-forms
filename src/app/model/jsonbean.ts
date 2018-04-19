import {Article} from './article.model';

export class JsonBean {
  code?: number;
  message?: string;
  data?: Article[];

  constructor() {
  }
}
