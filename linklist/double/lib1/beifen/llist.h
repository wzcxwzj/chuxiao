#ifndef LLIST_H__
#define LLIST_H__

#define LLIST_FORWARD		1	//首部插入
#define LLIST_BACKWARD		2	//尾部插入
typedef void llist_op(const void *);
typedef int llist_cmp(const void *,const void *);

struct llist_node_st	//普通节点
{
	void *data;
	struct llist_node_st *prev;
	struct llist_node_St *next;
};

typedef struct 		//头结点
{
	int size;
	struct llist_node_st head;

}LLIST;

LLIST *llist_create(int initsize);

int llist_insert(LLIST *,const void * data,int mode);

void * llist_find(LLIST *,const void *key,llist_cmp *);

int llist_delete(LLIST *,const void *Key,llist_cmp *);

int llist_fetch(LLIST *,const void *key,llist_cmp *,void *data);	//原封不动把某个结点脱链拿回来

void llist_travel(LLIST *,llist_op *);		//显示效果 遍历当前这条链表

void llist_destroy(LLIST *);

#endif
