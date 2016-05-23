#ifndef Person_h
#define Person_h
#include <string>
class Person{
// [初始化相关]
public:
    Person();
    Person(const std::string& name);
    Person(const std::string& name, int age);
    Person(const std::string& name, int age, float height);
    ~Person();
// [属性定义]基础属性
protected:
    std::string m_sName;
    int m_nAge;
    float m_fHeight;
// [方法声明]类自身行为
public:
    void onGreetings();     // 打招呼
    void onSpeakWithContent(const std::string& content);// 说话
// [方法声明]属性getter && setter
public:
    const std::string& getName();
    void setName(const std::string& name);
    int getAge();
    void setAge(int age);
    float getHeight();
    void setHeight(float height);
};
#endif /* Person_h */
