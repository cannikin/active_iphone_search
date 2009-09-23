/**
 * Appcelerator Titanium Mobile
 * This is generated code. Do not modify. Your changes will be lost.
 * Generated code is Copyright (c) 2009 by Appcelerator, Inc.
 * All Rights Reserved.
 */
#import <Foundation/Foundation.h>

@protocol TitaniumAppAssetResolver
- (NSData*) resolveAppAsset:(NSURL*)url;
- (oneway void)release;
- (id)retain;
@end

@interface ApplicationRouting : NSObject<TitaniumAppAssetResolver> {
}
- (NSData*) resolveAppAsset:(NSURL*)url;
- (NSData*) pageNamedIndex;
- (NSData*) scriptNamedJavascripts_application;
- (NSData*) scriptNamedJavascripts_helpers;
- (NSData*) scriptNamedJavascripts_prototype_1_6_0;
- (NSData*) scriptNamedJavascripts_scriptaculous_1_8_2;
- (NSData*) scriptNamedJavascripts_xml2json;
- (NSData*) scriptNamedJavascripts_xmlobjectifier;
- (NSData*) pageNamedNearby_index;
- (NSData*) pageNamedRunning_index;
- (NSData*) styleNamedStylesheets_reset_fonts;
- (NSData*) styleNamedStylesheets_shared;

@end
