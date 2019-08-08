//백준 알고리즘 No.10828
//스택 구현하기

#define STACK_SIZE 10001
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int stack_top = -1;
int stack[STACK_SIZE];

void push(int x);
void pop();
void size();
void empty();
void top();

int main(void) {
	//trial : 수행할 명령의 개수를 입력받아 저장함
	int trial, i = 0;;
	scanf("%d", &trial);

	while (i < trial) {
		char order[10];
		scanf("%s", order); //수행할 명령의 이름을 입력받음
		if (!strcmp(order, "push")) {
			//push함수로 추가할 숫자를 추가로 입력받음
			int num;
			scanf("%d", &num);
			push(num);
		}
		else if (!strcmp(order, "pop")) pop();
		else if (!strcmp(order, "size")) size();
		else if (!strcmp(order, "empty")) empty();
		else if (!strcmp(order, "top")) top();

		i++;
	}
}

void push(int x) {
	if (stack_top >= STACK_SIZE - 1) 
		return;
	
	stack[++stack_top] = x;
}

void pop() {
	if (stack_top <= -1) {
		printf("-1\n");
		return;
	}
	printf("%d\n", stack[stack_top--]);
}

void size() {
	printf("%d\n", stack_top + 1);
}

void empty() {
	if (stack_top == -1) printf("1\n");
	else printf("0\n");
}

void top() {
	if (stack_top == -1) printf("-1\n");
	else printf("%d\n", stack[stack_top]);
}