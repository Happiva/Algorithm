//백준 알고리즘 No.9012
//괄호 문자열이 VPS(Valid PS)인지 판별하기
#include <stdio.h>
#include <string.h>
#define STACK_SIZE 51

char stack[STACK_SIZE]; //스택
int top = -1;
int isPass = 0; //이미 판정된 괄호열의 중복 판정을 막기 위한 변수

void push(char p);
char pop();
void reset_stack(); //스택의 top 및 isPass 변수를 초기화

int main(void) {
	//T : 입력받을 테스트 데이터의 개수, len : 입력받은 문자열의 길이
	int T, len;
	scanf("%d", &T);

	for (int i = 0; i < T; i++) {
		isPass = 0;
		char PS[51];//문자열을 입력받는 배열
		scanf("%s", PS);

		len = strlen(PS);

		char a; //pop된 문자가 저장될 변수

		//입력받은 문자열을 검사하여 '('이 등장하면 스택에 push, ')'이 등장하면 pop 수행
		for (int j = 0; j < len; j++) {
			if (PS[j] == '(') { 
				push(PS[j]);
				continue;
			}
			else if (PS[j] == ')') a = pop();

			//pop한 결과가 NULL일 경우, '('보다 ')'가 많다는 뜻이므로 틀린 괄호열 판정
			if (a == NULL) {
				isPass = 1;
				printf("NO\n");
				break;
			}
		}
		//')'보다 '('가 많은 경우
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