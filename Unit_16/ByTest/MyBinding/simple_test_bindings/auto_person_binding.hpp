#include "base/ccConfig.h"
#ifndef __auto_person_binding_h__
#define __auto_person_binding_h__

#include "jsapi.h"
#include "jsfriendapi.h"

extern JSClass  *jsb_Person_class;
extern JSObject *jsb_Person_prototype;

bool js_auto_person_binding_Person_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_auto_person_binding_Person_finalize(JSContext *cx, JSObject *obj);
void js_register_auto_person_binding_Person(JSContext *cx, JS::HandleObject global);
void register_all_auto_person_binding(JSContext* cx, JS::HandleObject obj);
bool js_auto_person_binding_Person_setHeight(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_onGreetings(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_getAge(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_setName(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_getName(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_getHeight(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_setAge(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_onSpeakWithContent(JSContext *cx, uint32_t argc, jsval *vp);
bool js_auto_person_binding_Person_Person(JSContext *cx, uint32_t argc, jsval *vp);

#endif // __auto_person_binding_h__
