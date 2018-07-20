import {ImageFile} from './image-file';

/**
 * 文章
 */
export class Article {
  id: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 摘要
   */
  summary: any;

  /**
   * 分类代码
   */
  categoryCode: number;

  /**
   * 文章分类
   */
  category: string;

  /**
   * 专题id
   */
  specialId: string;

  /**
   * 问题id
   */
  questionId: string;

  /**
   * 作者id
   */
  authorId: string;

  /**
   * 创建时间
   */
  createDate: string;

  /**
   * 更新时间
   */
  updateDate: string;

  /**
   * 文章状态，0正常、1禁用
   */
  state: number;

  /**
   * 是否平台文章，默认否
   */
  platform: boolean;

  /**
   * 文章是否开放，默认是
   */
  open: boolean;

  /**
   * 文章是否被删除，默认否
   */
  deleted: boolean;

  /**
   * 是否第一段免费，默认是
   */
  firstFree: boolean;

  /**
   * 文章价格
   */
  price: number;

  /**购买数*/
  number: number;

  /**作者名*/
  authorName: string;

  /**关注数*/
  focusNumber: number;

  /**点赞数*/
  loveNumber: number;

  /**鄙视数*/
  despiseNumber: number;
  fileList: ImageFile[];
  image: string;
  content: string;
  page?: number;
  pageSize?: number;
}
