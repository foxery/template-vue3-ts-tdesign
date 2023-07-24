export interface ITree {
  id: number; //权限id
  parentId: number; //上级权限id
  name: string; //名称
  route: string; //路由
  children: ITree[];
}
