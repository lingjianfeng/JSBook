#include "Person.h"

// [初始化相关]
Person::Person(){
    
}

Person::Person(const std::string& name):
m_nAge(0),
m_fHeight(0){
    m_sName = name;
}

Person::Person(const std::string& name, int age):
m_fHeight(0){
    m_sName = name;
    m_nAge = age;
}

Person::Person(const std::string& name, int age, float height){
    m_sName = name;
    m_nAge = age;
    m_fHeight = height;
}

Person::~Person(){
}

// [方法声明]_类自身行为
// 打招呼
void Person::onGreetings() {
    CCLOG("Hi, I am person");
}

// 说话
void Person::onSpeakWithContent(const std::string& content){
    CCLOG("%s", content.c_str());
}

// [方法声明]_属性getter && setter
const std::string& Person::getName(){
    return m_sName;
}

void Person::setName(const std::string& name){
    m_sName = name;
}

int Person::getAge(){
    return m_nAge;
}

void Person::setAge(int age){
    m_nAge = age;
}

float Person::getHeight(){
    return m_fHeight;
}

void Person::setHeight(float height){
    m_fHeight = height;
}