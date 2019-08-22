//���� �˰��� No.9012
//��ȣ ���ڿ��� VPS(Valid PS)���� �Ǻ��ϱ�
#include <stdio.h>
#include <string.h>
#define STACK_SIZE 51

char stack[STACK_SIZE]; //����
int top = -1;
int isPass = 0; //�̹� ������ ��ȣ���� �ߺ� ������ ���� ���� ����

void push(char p);
char pop();
void reset_stack(); //������ top �� isPass ������ �ʱ�ȭ

int main(void) {
	//T : �Է¹��� �׽�Ʈ �������� ����, len : �Է¹��� ���ڿ��� ����
	int T, len;
	scanf("%d", &T);

	for (int i = 0; i < T; i++) {
		isPass = 0;
		char PS[51];//���ڿ��� �Է¹޴� �迭
		scanf("%s", PS);

		len = strlen(PS);

		char a; //pop�� ���ڰ� ����� ����

		//�Է¹��� ���ڿ��� �˻��Ͽ� '('�� �����ϸ� ���ÿ� push, ')'�� �����ϸ� pop ����
		for (int j = 0; j < len; j++) {
			if (PS[j] == '(') { 
				push(PS[j]);
				continue;
			}
			else if (PS[j] == ')') a = pop();

			//pop�� ����� NULL�� ���, '('���� ')'�� ���ٴ� ���̹Ƿ� Ʋ�� ��ȣ�� ����
			if (a == NULL) {
				isPass = 1;
				printf("NO\n");
				break;
			}
		}
		//')'���� '('�� ���� ���
		if (top > -1 && isPass == 0) { 
			printf("NO\n");
			reset_stack();
			continue;
		}
		if (top == -1 && isPass == 0) printf("YES\n");
		reset_stack();
	}
}

void push(char p) {
	if (top >= STACK_SIZE) return 0;
	else stack[++top] = p;
}

char pop() {
	if (top < 0) return NULL;
	else return stack[top--];
}

void reset_stack() {
	top = -1;
	isPass = 0;
}