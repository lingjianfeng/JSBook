LOCAL_PATH := $(call my-dir)
include $(CLEAR_VARS)
LOCAL_MODULE := cocos2djs_shared
LOCAL_MODULE_FILENAME := libcocos2djs

LOCAL_SRC_FILES := hellojavascript/main.cpp \
                   	../../Classes/jeff/Person.cpp \
                   	../../Classes/jeff/auto/jsb_jeff_external_auto.cpp \
                   	../../Classes/AppDelegate.cpp
                   

LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
					$(LOCAL_PATH)/../../Classes/jeff \
					$(LOCAL_PATH)/../../Classes/jeff/auto

LOCAL_STATIC_LIBRARIES := cocos2d_js_static
LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 -DCOCOS2D_JAVASCRIPT
include $(BUILD_SHARED_LIBRARY)
$(call import-module, scripting/js-bindings/proj.android)
