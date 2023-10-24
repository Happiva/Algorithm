//���� �˰��� No.10845
//ť �����ϱ�

#define Q_SIZE 10001
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int top = -1; int rear = -1;
int queue[Q_SIZE];

void push(int x);
void pop();
void size();
void empty();
void front();
void back();

int main(void) {
	//trial : ������ ����� ������ �Է¹޾� ������
	int trial, i = 0;
	scanf("%d", &trial);

	while (i < trial) {
		char order[10];
		scanf("%s", order); //������ ����� �Է¹���
		if (!strcmp(order, "push")) {
			//push ����� ���, ť�� �߰��� ���ڸ� �߰��� �Է¹���
			int num;
			scanf("%d", &num);
			push(num);
		}
		else if (!strcmp(order, "pop")) pop();
		else if (!strcmp(order, "size")) size();
		else if (!strcmp(order, "empty")) empty();
		else if (!strcmp(order, "front")) front();
		else if (!strcmp(order, "back")) back();

		i++;
	}
}

void push(int x) {
	if (rear == Q_SIZE - 1) return;
	else queue[++rear] = x;
}

void pop() {
	if (top == rear) {
		printf("-1\n");
		return;
	}
	else { 
		printf("%d\n", queue[top + 1]);
		top++;
	}
}

void size() {
	printf("%d\n", rear - top);
}

void empty() {
	if (top == rear) { 
		printf("1\n");
		return;
	}
	else printf("0\n");
}

void front() {
	if (top == rear) {
		printf("-1\n");
		return;
	}
	else printf("%d\n", queue[top + 1]);
}

void back() {
	if (top == rear) {
		printf("-1\n");
		return;
	}
	else printf("%d\n", queue[rear]);
}