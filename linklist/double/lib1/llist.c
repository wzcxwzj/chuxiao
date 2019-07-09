#include <stdio.h>
#include <stdlib.h>

#include "llist.h"


LLIST *llist_create(int initsize)
{
	LLIST *new;

	new = malloc(sizeof(*new));
	if(new == NULL)
		return NULL;

	new->size = initsize;
	new->head.data = NULL;
	new->head.prev = &new->head;
	new->head.next = &new->head;

	return new;
}

int llist_insert(LLIST *,const void * data,int mode)
{
	struct llist_node_st *newnode;
	newnode = malloc(sizeof(*newnode));
	if( newnode == NULL)
		return -1;

	newnode->data = malloc(ptr->size);
	if(newdata == NULL)
		return -2;
	memcpy(newnode->data,data,ptr->size);
	
	if(mode == LLIST_FORWORD)
	{
		newnode->prev=&ptr->head;
		newnode->next=ptr->head.next;		

	}
	else if(mode == LLIST_BACKWARD)
		{
			newnode->prev = ptr->head.prev; 
			newnode->next = &ptr->head;
		}
		else		//error
		{
			return -3;
		}

	newnode->prev->next = newnode;
	newnode->next->prev = newnode;
}
/*
llist_find()
{

}

llist_delete()
{
}
llist_fetch()
{

}*/
void llist_travel(LLIST *)
{
}
void llist_destroy(LLIST *ptr)
{
	struct llist_node_st *cur,*next;
	for(cur = ptr->head.next ; cur != &ptr->head ; cur = next )	
	{
		next = cur->next;
		free(cur->data);
		free(cur);
		
	}
	free(ptr);
}






