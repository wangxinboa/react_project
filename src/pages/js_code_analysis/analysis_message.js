export default {
	"codeFiles": [
		{
			"type": "folder",
			"name": "reproduction",
			"folders": [
				{
					"type": "folder",
					"name": "src",
					"folders": [
						{
							"type": "folder",
							"name": "gif",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "GifAsset.mjs"
								},
								{
									"type": "file",
									"name": "GifSource.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "GifSprite.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "advanced-blend-modes",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "DarkenBlend.mjs"
								},
								{
									"type": "file",
									"name": "DivideBlend.mjs"
								},
								{
									"type": "file",
									"name": "LinearBurnBlend.mjs"
								},
								{
									"type": "file",
									"name": "HardLightBlend.mjs"
								},
								{
									"type": "file",
									"name": "ColorBlend.mjs"
								},
								{
									"type": "file",
									"name": "ColorDodgeBlend.mjs"
								},
								{
									"type": "file",
									"name": "PinLightBlend.mjs"
								},
								{
									"type": "file",
									"name": "SoftLightBlend.mjs"
								},
								{
									"type": "file",
									"name": "ColorBurnBlend.mjs"
								},
								{
									"type": "file",
									"name": "ExclusionBlend.mjs"
								},
								{
									"type": "file",
									"name": "LuminosityBlend.mjs"
								},
								{
									"type": "file",
									"name": "NegationBlend.mjs"
								},
								{
									"type": "file",
									"name": "SaturationBlend.mjs"
								},
								{
									"type": "file",
									"name": "VividLightBlend.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "SubtractBlend.mjs"
								},
								{
									"type": "file",
									"name": "LinearLightBlend.mjs"
								},
								{
									"type": "file",
									"name": "DifferenceBlend.mjs"
								},
								{
									"type": "file",
									"name": "OverlayBlend.mjs"
								},
								{
									"type": "file",
									"name": "LinearDodgeBlend.mjs"
								},
								{
									"type": "file",
									"name": "LightenBlend.mjs"
								},
								{
									"type": "file",
									"name": "HardMixBlend.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "spritesheet",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "spritesheetAsset.mjs"
								},
								{
									"type": "file",
									"name": "Spritesheet.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "assets",
							"folders": [
								{
									"type": "folder",
									"name": "resolver",
									"folders": [
										{
											"type": "folder",
											"name": "parsers",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "resolveTextureUrl.mjs"
												},
												{
													"type": "file",
													"name": "resolveJsonUrl.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "Resolver.md"
										},
										{
											"type": "file",
											"name": "types.mjs"
										},
										{
											"type": "file",
											"name": "Resolver.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "detections",
									"folders": [
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "testVideoFormat.mjs"
												},
												{
													"type": "file",
													"name": "testImageFormat.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "parsers",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "detectWebm.mjs"
												},
												{
													"type": "file",
													"name": "detectOgv.mjs"
												},
												{
													"type": "file",
													"name": "detect.md"
												},
												{
													"type": "file",
													"name": "detectAvif.mjs"
												},
												{
													"type": "file",
													"name": "detectMp4.mjs"
												},
												{
													"type": "file",
													"name": "detectWebp.mjs"
												},
												{
													"type": "file",
													"name": "detectDefaults.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "types.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "loader",
									"folders": [
										{
											"type": "folder",
											"name": "workers",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "WorkerManager.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "parsers",
											"folders": [
												{
													"type": "folder",
													"name": "textures",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "createTexture.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "loadSVG.mjs"
														},
														{
															"type": "file",
															"name": "loadVideoTextures.mjs"
														},
														{
															"type": "file",
															"name": "loadTextures.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "LoaderParser.mjs"
												},
												{
													"type": "file",
													"name": "loadJson.mjs"
												},
												{
													"type": "file",
													"name": "loadTxt.mjs"
												},
												{
													"type": "file",
													"name": "loadWebFont.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "types.mjs"
										},
										{
											"type": "file",
											"name": "Loader.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "utils",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "createStringVariations.mjs"
										},
										{
											"type": "file",
											"name": "checkDataUrl.mjs"
										},
										{
											"type": "file",
											"name": "checkExtension.mjs"
										},
										{
											"type": "file",
											"name": "isSingleItem.mjs"
										},
										{
											"type": "file",
											"name": "convertToList.mjs"
										},
										{
											"type": "file",
											"name": "copySearchParams.mjs"
										},
										{
											"type": "file",
											"name": "convertToList.md"
										}
									]
								},
								{
									"type": "folder",
									"name": "cache",
									"folders": [
										{
											"type": "folder",
											"name": "parsers",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "cacheTextureArray.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "Cache.md"
										},
										{
											"type": "file",
											"name": "Cache.mjs"
										},
										{
											"type": "file",
											"name": "CacheParser.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "Assets.md"
								},
								{
									"type": "file",
									"name": "types.mjs"
								},
								{
									"type": "file",
									"name": "Assets.mjs"
								},
								{
									"type": "file",
									"name": "BackgroundLoader.md"
								},
								{
									"type": "file",
									"name": "AssetExtension.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "BackgroundLoader.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "accessibility",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "AccessibilitySystem.mjs"
								},
								{
									"type": "file",
									"name": "accessibilityTarget.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "events",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "FederatedPointerEvent.mjs"
								},
								{
									"type": "file",
									"name": "FederatedEventTarget.mjs"
								},
								{
									"type": "file",
									"name": "FederatedMouseEvent.mjs"
								},
								{
									"type": "file",
									"name": "FederatedEvent.mjs"
								},
								{
									"type": "file",
									"name": "FederatedEventMap.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "EventBoundaryTypes.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "EventBoundary.mjs"
								},
								{
									"type": "file",
									"name": "deprecatedTypes.mjs"
								},
								{
									"type": "file",
									"name": "FederatedWheelEvent.mjs"
								},
								{
									"type": "file",
									"name": "EventSystem.mjs"
								},
								{
									"type": "file",
									"name": "EventTicker.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "scene",
							"folders": [
								{
									"type": "folder",
									"name": "mesh-plane",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "PlaneGeometry.mjs"
										},
										{
											"type": "file",
											"name": "MeshPlane.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "graphics",
									"folders": [
										{
											"type": "folder",
											"name": "gl",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "GlGraphicsAdaptor.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "shared",
											"folders": [
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "triangulateWithHoles.mjs"
														},
														{
															"type": "file",
															"name": "buildContextBatches.mjs"
														},
														{
															"type": "file",
															"name": "buildGeometryFromPath.mjs"
														},
														{
															"type": "file",
															"name": "generateTextureFillMatrix.mjs"
														},
														{
															"type": "file",
															"name": "getOrientationOfPoints.mjs"
														},
														{
															"type": "file",
															"name": "convertFillInputToFillStyle.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "path",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "ShapePath.mjs"
														},
														{
															"type": "file",
															"name": "roundShape.mjs"
														},
														{
															"type": "file",
															"name": "GraphicsPath.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "fill",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "FillPattern.mjs"
														},
														{
															"type": "file",
															"name": "FillGradient.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "buildCommands",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "buildAdaptiveQuadratic.mjs"
														},
														{
															"type": "file",
															"name": "buildPixelLine.mjs"
														},
														{
															"type": "file",
															"name": "buildArcTo.mjs"
														},
														{
															"type": "file",
															"name": "buildArc.mjs"
														},
														{
															"type": "file",
															"name": "buildLine.mjs"
														},
														{
															"type": "file",
															"name": "buildCircle.mjs"
														},
														{
															"type": "file",
															"name": "buildPolygon.mjs"
														},
														{
															"type": "file",
															"name": "buildRectangle.mjs"
														},
														{
															"type": "file",
															"name": "buildAdaptiveBezier.mjs"
														},
														{
															"type": "file",
															"name": "buildArcToSvg.mjs"
														},
														{
															"type": "file",
															"name": "buildTriangle.mjs"
														},
														{
															"type": "file",
															"name": "ShapeBuildCommand.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "svg",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "extractSvgUrlId.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "parseSVGDefinitions.mjs"
														},
														{
															"type": "file",
															"name": "parseSVGFloatAttribute.mjs"
														},
														{
															"type": "file",
															"name": "parseSVGPath.mjs"
														},
														{
															"type": "file",
															"name": "parseSVGStyle.mjs"
														},
														{
															"type": "file",
															"name": "SVGParser.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "GraphicsContextSystem.mjs"
												},
												{
													"type": "file",
													"name": "BatchableGraphics.mjs"
												},
												{
													"type": "file",
													"name": "GraphicsContext.mjs"
												},
												{
													"type": "file",
													"name": "GraphicsPipe.mjs"
												},
												{
													"type": "file",
													"name": "FillTypes.mjs"
												},
												{
													"type": "file",
													"name": "const.mjs"
												},
												{
													"type": "file",
													"name": "Graphics.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "gpu",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "colorToUniform.mjs"
												},
												{
													"type": "file",
													"name": "GpuGraphicsAdaptor.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "init.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "sprite-nine-slice",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "NineSliceSpritePipe.mjs"
										},
										{
											"type": "file",
											"name": "NineSliceGeometry.mjs"
										},
										{
											"type": "file",
											"name": "NineSliceSprite.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "text",
									"folders": [
										{
											"type": "folder",
											"name": "canvas",
											"folders": [
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "getCanvasFillStyle.mjs"
														},
														{
															"type": "file",
															"name": "fontStringFromTextStyle.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "CanvasTextPipe.mjs"
												},
												{
													"type": "file",
													"name": "CanvasTextSystem.mjs"
												},
												{
													"type": "file",
													"name": "CanvasTextMetrics.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "updateTextBounds.mjs"
												},
												{
													"type": "file",
													"name": "generateTextStyleKey.mjs"
												},
												{
													"type": "file",
													"name": "getPo2TextureFromSource.mjs"
												},
												{
													"type": "file",
													"name": "ensureTextStyle.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "sdfShader",
											"folders": [
												{
													"type": "folder",
													"name": "shader-bits",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "localUniformMSDFBit.mjs"
														},
														{
															"type": "file",
															"name": "mSDFBit.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "SdfShader.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "Text.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "TextStyle.mjs"
										},
										{
											"type": "file",
											"name": "AbstractText.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "text-bitmap",
									"folders": [
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "resolveCharacters.mjs"
												},
												{
													"type": "file",
													"name": "getBitmapTextLayout.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "asset",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "bitmapFontXMLParser.mjs"
												},
												{
													"type": "file",
													"name": "bitmapFontXMLStringParser.mjs"
												},
												{
													"type": "file",
													"name": "bitmapFontTextParser.mjs"
												},
												{
													"type": "file",
													"name": "loadBitmapFont.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "BitmapText.mjs"
										},
										{
											"type": "file",
											"name": "BitmapFont.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "DynamicBitmapFont.mjs"
										},
										{
											"type": "file",
											"name": "BitmapFontManager.mjs"
										},
										{
											"type": "file",
											"name": "AbstractBitmapFont.mjs"
										},
										{
											"type": "file",
											"name": "BitmapTextPipe.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "particle-container",
									"folders": [
										{
											"type": "folder",
											"name": "gl",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "GlParticleContainerAdaptor.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "shared",
											"folders": [
												{
													"type": "folder",
													"name": "shader",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "particles.frag.mjs"
														},
														{
															"type": "file",
															"name": "particles.vert.mjs"
														},
														{
															"type": "file",
															"name": "particles.wgsl.mjs"
														},
														{
															"type": "file",
															"name": "ParticleShader.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "generateParticleUpdateFunction.mjs"
														},
														{
															"type": "file",
															"name": "createIndicesForQuads.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "GlParticleContainerPipe.mjs"
												},
												{
													"type": "file",
													"name": "Particle.mjs"
												},
												{
													"type": "file",
													"name": "GpuParticleContainerPipe.mjs"
												},
												{
													"type": "file",
													"name": "ParticleContainerPipe.mjs"
												},
												{
													"type": "file",
													"name": "ParticleBuffer.mjs"
												},
												{
													"type": "file",
													"name": "particleData.mjs"
												},
												{
													"type": "file",
													"name": "ParticleContainer.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "gpu",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "GpuParticleContainerAdaptor.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "init.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "mesh-simple",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "RopeGeometry.mjs"
										},
										{
											"type": "file",
											"name": "MeshRope.mjs"
										},
										{
											"type": "file",
											"name": "MeshSimple.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "sprite",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "Sprite.mjs"
										},
										{
											"type": "file",
											"name": "SpritePipe.mjs"
										},
										{
											"type": "file",
											"name": "BatchableSprite.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "view",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "ViewContainer.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "mesh-perspective",
									"folders": [
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "compute2DProjections.mjs"
												},
												{
													"type": "file",
													"name": "applyProjectiveTransformationToPlane.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "PerspectiveMesh.mjs"
										},
										{
											"type": "file",
											"name": "PerspectivePlaneGeometry.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "sprite-tiling",
									"folders": [
										{
											"type": "folder",
											"name": "shader",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "TilingSpriteShader.mjs"
												},
												{
													"type": "file",
													"name": "tilingBit.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "QuadGeometry.mjs"
												},
												{
													"type": "file",
													"name": "setPositions.mjs"
												},
												{
													"type": "file",
													"name": "applyMatrix.mjs"
												},
												{
													"type": "file",
													"name": "setUvs.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "TilingSpritePipe.mjs"
										},
										{
											"type": "file",
											"name": "TilingSprite.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "sprite-animated",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "AnimatedSprite.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "container",
									"folders": [
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "updateWorldTransform.mjs"
												},
												{
													"type": "file",
													"name": "assignWithIgnore.mjs"
												},
												{
													"type": "file",
													"name": "definedProps.mjs"
												},
												{
													"type": "file",
													"name": "checkChildrenDidChange.mjs"
												},
												{
													"type": "file",
													"name": "collectAllRenderables.mjs"
												},
												{
													"type": "file",
													"name": "updateLocalTransform.mjs"
												},
												{
													"type": "file",
													"name": "updateRenderGroupTransforms.mjs"
												},
												{
													"type": "file",
													"name": "clearList.mjs"
												},
												{
													"type": "file",
													"name": "multiplyHexColors.mjs"
												},
												{
													"type": "file",
													"name": "validateRenderables.mjs"
												},
												{
													"type": "file",
													"name": "multiplyColors.mjs"
												},
												{
													"type": "file",
													"name": "mixHexColors.mjs"
												},
												{
													"type": "file",
													"name": "executeInstructions.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "bounds",
											"folders": [
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "matrixAndBoundsPool.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "getGlobalBounds.mjs"
												},
												{
													"type": "file",
													"name": "getFastGlobalBounds.mjs"
												},
												{
													"type": "file",
													"name": "getRenderableBounds.mjs"
												},
												{
													"type": "file",
													"name": "Bounds.mjs"
												},
												{
													"type": "file",
													"name": "getLocalBounds.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "container-mixins",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "toLocalGlobalMixin.mjs"
												},
												{
													"type": "file",
													"name": "findMixin.mjs"
												},
												{
													"type": "file",
													"name": "childrenHelperMixin.mjs"
												},
												{
													"type": "file",
													"name": "measureMixin.mjs"
												},
												{
													"type": "file",
													"name": "getFastGlobalBoundsMixin.mjs"
												},
												{
													"type": "file",
													"name": "onRenderMixin.mjs"
												},
												{
													"type": "file",
													"name": "effectsMixin.mjs"
												},
												{
													"type": "file",
													"name": "collectRenderablesMixin.mjs"
												},
												{
													"type": "file",
													"name": "cacheAsTextureMixin.mjs"
												},
												{
													"type": "file",
													"name": "sortMixin.mjs"
												},
												{
													"type": "file",
													"name": "getGlobalMixin.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "destroyTypes.mjs"
										},
										{
											"type": "file",
											"name": "CustomRenderPipe.mjs"
										},
										{
											"type": "file",
											"name": "Container.mjs"
										},
										{
											"type": "file",
											"name": "RenderGroupSystem.mjs"
										},
										{
											"type": "file",
											"name": "Effect.mjs"
										},
										{
											"type": "file",
											"name": "RenderGroupPipe.mjs"
										},
										{
											"type": "file",
											"name": "RenderGroup.mjs"
										},
										{
											"type": "file",
											"name": "RenderContainer.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "layers",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "RenderLayer.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "text-html",
									"folders": [
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "textStyleToCSS.mjs"
												},
												{
													"type": "file",
													"name": "getFontCss.mjs"
												},
												{
													"type": "file",
													"name": "extractFontFamilies.mjs"
												},
												{
													"type": "file",
													"name": "measureHtmlText.mjs"
												},
												{
													"type": "file",
													"name": "getTemporaryCanvasFromImage.mjs"
												},
												{
													"type": "file",
													"name": "loadSVGImage.mjs"
												},
												{
													"type": "file",
													"name": "getSVGUrl.mjs"
												},
												{
													"type": "file",
													"name": "loadFontAsBase64.mjs"
												},
												{
													"type": "file",
													"name": "loadFontCSS.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "HTMLTextStyle.mjs"
										},
										{
											"type": "file",
											"name": "HTMLTextRenderData.mjs"
										},
										{
											"type": "file",
											"name": "HTMLTextSystem.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "HTMLText.mjs"
										},
										{
											"type": "file",
											"name": "HTMLTextPipe.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "mesh",
									"folders": [
										{
											"type": "folder",
											"name": "gl",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "GlMeshAdaptor.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "shared",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "BatchableMesh.mjs"
												},
												{
													"type": "file",
													"name": "Mesh.mjs"
												},
												{
													"type": "file",
													"name": "getTextureDefaultMatrix.mjs"
												},
												{
													"type": "file",
													"name": "MeshGeometry.mjs"
												},
												{
													"type": "file",
													"name": "MeshPipe.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "gpu",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "GpuMeshAdapter.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "init.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "rendering",
							"folders": [
								{
									"type": "folder",
									"name": "batcher",
									"folders": [
										{
											"type": "folder",
											"name": "gl",
											"folders": [
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "maxRecommendedTextures.mjs"
														},
														{
															"type": "file",
															"name": "checkMaxIfStatementsInShader.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "GlBatchAdaptor.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "shared",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "DefaultBatcher.mjs"
												},
												{
													"type": "file",
													"name": "DefaultShader.mjs"
												},
												{
													"type": "file",
													"name": "Batcher.mjs"
												},
												{
													"type": "file",
													"name": "BatchGeometry.mjs"
												},
												{
													"type": "file",
													"name": "BatcherPipe.mjs"
												},
												{
													"type": "file",
													"name": "BatchTextureArray.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "gpu",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "generateGPULayout.mjs"
												},
												{
													"type": "file",
													"name": "generateLayout.mjs"
												},
												{
													"type": "file",
													"name": "getTextureBatchBindGroup.mjs"
												},
												{
													"type": "file",
													"name": "GpuBatchAdaptor.mjs"
												}
											]
										}
									],
									"files": []
								},
								{
									"type": "folder",
									"name": "high-shader",
									"folders": [
										{
											"type": "folder",
											"name": "compiler",
											"folders": [
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "compileInputs.mjs"
														},
														{
															"type": "file",
															"name": "formatShader.mjs"
														},
														{
															"type": "file",
															"name": "addBits.mjs"
														},
														{
															"type": "file",
															"name": "compileHooks.mjs"
														},
														{
															"type": "file",
															"name": "compileOutputs.mjs"
														},
														{
															"type": "file",
															"name": "injectBits.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "compileHighShader.mjs"
												},
												{
													"type": "file",
													"name": "types.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "shader-bits",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "localUniformBit.mjs"
												},
												{
													"type": "file",
													"name": "roundPixelsBit.mjs"
												},
												{
													"type": "file",
													"name": "textureBit.mjs"
												},
												{
													"type": "file",
													"name": "globalUniformsBit.mjs"
												},
												{
													"type": "file",
													"name": "colorBit.mjs"
												},
												{
													"type": "file",
													"name": "generateTextureBatchBit.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "compileHighShaderToProgram.mjs"
										},
										{
											"type": "file",
											"name": "defaultProgramTemplate.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "mask",
									"folders": [
										{
											"type": "folder",
											"name": "scissor",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "ScissorMask.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "alpha",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "AlphaMaskPipe.mjs"
												},
												{
													"type": "file",
													"name": "AlphaMask.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "addMaskBounds.mjs"
												},
												{
													"type": "file",
													"name": "addMaskLocalBounds.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "color",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "ColorMask.mjs"
												},
												{
													"type": "file",
													"name": "ColorMaskPipe.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "stencil",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "StencilMaskPipe.mjs"
												},
												{
													"type": "file",
													"name": "StencilMask.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "MaskEffectManager.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "renderers",
									"folders": [
										{
											"type": "folder",
											"name": "gl",
											"folders": [
												{
													"type": "folder",
													"name": "buffer",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "GlBuffer.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														},
														{
															"type": "file",
															"name": "GlBufferSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "renderTarget",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "GlRenderTargetAdaptor.mjs"
														},
														{
															"type": "file",
															"name": "GlRenderTargetSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "geometry",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "getGlTypeFromFormat.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "GlGeometrySystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "shader",
													"folders": [
														{
															"type": "folder",
															"name": "program",
															"folders": [
																{
																	"type": "folder",
																	"name": "preprocessors",
																	"folders": [],
																	"files": [
																		{
																			"type": "file",
																			"name": "ensurePrecision.mjs"
																		},
																		{
																			"type": "file",
																			"name": "stripVersion.mjs"
																		},
																		{
																			"type": "file",
																			"name": "insertVersion.mjs"
																		},
																		{
																			"type": "file",
																			"name": "addProgramDefines.mjs"
																		},
																		{
																			"type": "file",
																			"name": "setProgramName.mjs"
																		}
																	]
																}
															],
															"files": [
																{
																	"type": "file",
																	"name": "getTestContext.mjs"
																},
																{
																	"type": "file",
																	"name": "getUboData.mjs"
																},
																{
																	"type": "file",
																	"name": "defaultValue.mjs"
																},
																{
																	"type": "file",
																	"name": "ensureAttributes.mjs"
																},
																{
																	"type": "file",
																	"name": "mapSize.mjs"
																},
																{
																	"type": "file",
																	"name": "mapType.mjs"
																},
																{
																	"type": "file",
																	"name": "getMaxFragmentPrecision.mjs"
																},
																{
																	"type": "file",
																	"name": "extractAttributesFromGlProgram.mjs"
																},
																{
																	"type": "file",
																	"name": "logProgramError.mjs"
																},
																{
																	"type": "file",
																	"name": "getUniformData.mjs"
																},
																{
																	"type": "file",
																	"name": "compileShader.mjs"
																},
																{
																	"type": "file",
																	"name": "generateProgram.mjs"
																}
															]
														},
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "createUboSyncSTD40.mjs"
																},
																{
																	"type": "file",
																	"name": "createUboElementsSTD40.mjs"
																},
																{
																	"type": "file",
																	"name": "generateArraySyncSTD40.mjs"
																},
																{
																	"type": "file",
																	"name": "generateUniformsSync.mjs"
																},
																{
																	"type": "file",
																	"name": "generateUniformsSyncTypes.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "GlShaderSystem.mjs"
														},
														{
															"type": "file",
															"name": "GlProgram.mjs"
														},
														{
															"type": "file",
															"name": "migrateFragmentFromV7toV8.mjs"
														},
														{
															"type": "file",
															"name": "GlUniformGroupSystem.mjs"
														},
														{
															"type": "file",
															"name": "getBatchSamplersUniformGroup.mjs"
														},
														{
															"type": "file",
															"name": "GenerateShaderSyncCode.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														},
														{
															"type": "file",
															"name": "GlProgramData.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "texture",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "mapFormatToGlFormat.mjs"
																},
																{
																	"type": "file",
																	"name": "pixiToGlMaps.mjs"
																},
																{
																	"type": "file",
																	"name": "applyStyleParams.mjs"
																},
																{
																	"type": "file",
																	"name": "getSupportedGlCompressedTextureFormats.mjs"
																},
																{
																	"type": "file",
																	"name": "unpremultiplyAlpha.mjs"
																},
																{
																	"type": "file",
																	"name": "mapFormatToGlType.mjs"
																},
																{
																	"type": "file",
																	"name": "mapFormatToGlInternalFormat.mjs"
																}
															]
														},
														{
															"type": "folder",
															"name": "uploaders",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "glUploadCompressedTextureResource.mjs"
																},
																{
																	"type": "file",
																	"name": "glUploadVideoResource.mjs"
																},
																{
																	"type": "file",
																	"name": "GLTextureUploader.mjs"
																},
																{
																	"type": "file",
																	"name": "glUploadImageResource.mjs"
																},
																{
																	"type": "file",
																	"name": "glUploadBufferImageResource.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "GlTexture.mjs"
														},
														{
															"type": "file",
															"name": "GlTextureSystem.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "state",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "mapWebGLBlendModesToPixi.mjs"
														},
														{
															"type": "file",
															"name": "GlStateSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "context",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "WebGLExtensions.mjs"
														},
														{
															"type": "file",
															"name": "GlRenderingContext.mjs"
														},
														{
															"type": "file",
															"name": "GlContextSystem.mjs"
														},
														{
															"type": "file",
															"name": "GlContextSystem.md"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "GlBackBufferSystem.mjs"
												},
												{
													"type": "file",
													"name": "GlEncoderSystem.mjs"
												},
												{
													"type": "file",
													"name": "WebGLRenderer.md"
												},
												{
													"type": "file",
													"name": "WebGLRenderer.mjs"
												},
												{
													"type": "file",
													"name": "GlColorMaskSystem.mjs"
												},
												{
													"type": "file",
													"name": "const.mjs"
												},
												{
													"type": "file",
													"name": "GlStencilSystem.mjs"
												},
												{
													"type": "file",
													"name": "GlRenderTarget.mjs"
												},
												{
													"type": "file",
													"name": "GlUboSystem.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "shared",
											"folders": [
												{
													"type": "folder",
													"name": "buffer",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "fastCopy.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "BufferResource.mjs"
														},
														{
															"type": "file",
															"name": "Buffer.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "renderTarget",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "RenderTarget.mjs"
														},
														{
															"type": "file",
															"name": "RenderTargetSystem.mjs"
														},
														{
															"type": "file",
															"name": "isRenderingToScreen.mjs"
														},
														{
															"type": "file",
															"name": "viewportFromFrame.mjs"
														},
														{
															"type": "file",
															"name": "GlobalUniformSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "blendModes",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "BlendModePipe.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "startup",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "HelloSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "geometry",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "ensureIsBuffer.mjs"
																},
																{
																	"type": "file",
																	"name": "getAttributeInfoFromFormat.mjs"
																},
																{
																	"type": "file",
																	"name": "buildUvs.mjs"
																},
																{
																	"type": "file",
																	"name": "getGeometryBounds.mjs"
																},
																{
																	"type": "file",
																	"name": "transformVertices.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "Geometry.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "extract",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "GenerateTextureSystem.mjs"
														},
														{
															"type": "file",
															"name": "ExtractSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "shader",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "uniformParsers.mjs"
																},
																{
																	"type": "file",
																	"name": "getDefaultUniformValue.mjs"
																},
																{
																	"type": "file",
																	"name": "createUboSyncFunction.mjs"
																},
																{
																	"type": "file",
																	"name": "uboSyncFunctions.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "Shader.mjs"
														},
														{
															"type": "file",
															"name": "types.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														},
														{
															"type": "file",
															"name": "UniformGroup.mjs"
														},
														{
															"type": "file",
															"name": "UboSystem.mjs"
														},
														{
															"type": "file",
															"name": "ShaderSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "texture",
													"folders": [
														{
															"type": "folder",
															"name": "sources",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "CompressedSource.mjs"
																},
																{
																	"type": "file",
																	"name": "VideoSource.mjs"
																},
																{
																	"type": "file",
																	"name": "CanvasSource.mjs"
																},
																{
																	"type": "file",
																	"name": "TextureSource.mjs"
																},
																{
																	"type": "file",
																	"name": "ImageSource.mjs"
																},
																{
																	"type": "file",
																	"name": "BufferImageSource.mjs"
																}
															]
														},
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "getSupportedCompressedTextureFormats.mjs"
																},
																{
																	"type": "file",
																	"name": "textureFrom.mjs"
																},
																{
																	"type": "file",
																	"name": "generateUID.mjs"
																},
																{
																	"type": "file",
																	"name": "getCanvasTexture.mjs"
																},
																{
																	"type": "file",
																	"name": "getSupportedTextureFormats.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "RenderTexture.mjs"
														},
														{
															"type": "file",
															"name": "CanvasPool.mjs"
														},
														{
															"type": "file",
															"name": "TextureGCSystem.mjs"
														},
														{
															"type": "file",
															"name": "Texture.mjs"
														},
														{
															"type": "file",
															"name": "TextureMatrix.mjs"
														},
														{
															"type": "file",
															"name": "TexturePool.mjs"
														},
														{
															"type": "file",
															"name": "RenderableGCSystem.mjs"
														},
														{
															"type": "file",
															"name": "TextureUvs.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														},
														{
															"type": "file",
															"name": "TextureStyle.mjs"
														},
														{
															"type": "file",
															"name": "GenerateCanvas.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "view",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "View.mjs"
														},
														{
															"type": "file",
															"name": "ViewSystem.md"
														},
														{
															"type": "file",
															"name": "ViewSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "system",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "typeUtils.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "SystemRunner.mjs"
														},
														{
															"type": "file",
															"name": "SharedSystems.mjs"
														},
														{
															"type": "file",
															"name": "AbstractRenderer.mjs"
														},
														{
															"type": "file",
															"name": "AbstractRenderer.md"
														},
														{
															"type": "file",
															"name": "System.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "state",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "State.mjs"
														},
														{
															"type": "file",
															"name": "const.mjs"
														},
														{
															"type": "file",
															"name": "getAdjustedBlendModeBlend.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "utils",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "createIdFromString.mjs"
														},
														{
															"type": "file",
															"name": "parseFunctionBody.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "instructions",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "RenderPipe.mjs"
														},
														{
															"type": "file",
															"name": "InstructionSet.mjs"
														},
														{
															"type": "file",
															"name": "Instruction.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "background",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "BackgroundSystem.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "SchedulerSystem.mjs"
												},
												{
													"type": "file",
													"name": "Renderable.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "gpu",
											"folders": [
												{
													"type": "folder",
													"name": "buffer",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "GpuReadBuffer.mjs"
														},
														{
															"type": "file",
															"name": "GpuBufferSystem.mjs"
														},
														{
															"type": "file",
															"name": "UboBatch.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "renderTarget",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "GpuRenderTarget.mjs"
														},
														{
															"type": "file",
															"name": "calculateProjection.mjs"
														},
														{
															"type": "file",
															"name": "GpuRenderTargetAdaptor.mjs"
														},
														{
															"type": "file",
															"name": "GpuRenderTargetSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "shader",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "extractStructAndGroups.mjs"
																},
																{
																	"type": "file",
																	"name": "createUboElementsWGSL.mjs"
																},
																{
																	"type": "file",
																	"name": "removeStructAndGroupDuplicates.mjs"
																},
																{
																	"type": "file",
																	"name": "generateLayoutHash.mjs"
																},
																{
																	"type": "file",
																	"name": "generateArraySyncWGSL.mjs"
																},
																{
																	"type": "file",
																	"name": "extractAttributesFromGpuProgram.mjs"
																},
																{
																	"type": "file",
																	"name": "createUboSyncFunctionWGSL.mjs"
																},
																{
																	"type": "file",
																	"name": "generateGpuLayoutGroups.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "GpuProgram.mjs"
														},
														{
															"type": "file",
															"name": "BindResource.mjs"
														},
														{
															"type": "file",
															"name": "BindGroup.mjs"
														},
														{
															"type": "file",
															"name": "GpuShaderSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "texture",
													"folders": [
														{
															"type": "folder",
															"name": "utils",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "getSupportedGPUCompressedTextureFormats.mjs"
																},
																{
																	"type": "file",
																	"name": "GpuMipmapGenerator.mjs"
																}
															]
														},
														{
															"type": "folder",
															"name": "uploaders",
															"folders": [],
															"files": [
																{
																	"type": "file",
																	"name": "gpuUploadBufferImageResource.mjs"
																},
																{
																	"type": "file",
																	"name": "gpuUploadVideoSource.mjs"
																},
																{
																	"type": "file",
																	"name": "GpuTextureUploader.mjs"
																},
																{
																	"type": "file",
																	"name": "gpuUploadCompressedTextureResource.mjs"
																},
																{
																	"type": "file",
																	"name": "gpuUploadImageSource.mjs"
																}
															]
														}
													],
													"files": [
														{
															"type": "file",
															"name": "GpuTextureSystem.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "state",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "GpuStencilModesToPixi.mjs"
														},
														{
															"type": "file",
															"name": "GpuStateSystem.mjs"
														},
														{
															"type": "file",
															"name": "GpuBlendModesToPixi.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "pipeline",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "PipelineSystem.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "WebGPURenderer.mjs"
												},
												{
													"type": "file",
													"name": "GpuDeviceSystem.mjs"
												},
												{
													"type": "file",
													"name": "GpuUboSystem.mjs"
												},
												{
													"type": "file",
													"name": "GpuColorMaskSystem.mjs"
												},
												{
													"type": "file",
													"name": "GpuUniformBatchPipe.mjs"
												},
												{
													"type": "file",
													"name": "GpuEncoderSystem.mjs"
												},
												{
													"type": "file",
													"name": "GpuStencilSystem.mjs"
												},
												{
													"type": "file",
													"name": "BindGroupSystem.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "autoDetectRenderer.mjs"
										},
										{
											"type": "file",
											"name": "types.mjs"
										},
										{
											"type": "file",
											"name": "autoDetectRenderer.md"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "dom",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "DOMPipe.mjs"
								},
								{
									"type": "file",
									"name": "DOMContainer.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "environment",
							"folders": [
								{
									"type": "folder",
									"name": "canvas",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "ICanvas.mjs"
										},
										{
											"type": "file",
											"name": "ICanvasRenderingContext2D.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "autoDetectEnvironment.mjs"
								},
								{
									"type": "file",
									"name": "_environment.md"
								},
								{
									"type": "file",
									"name": "adapter.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "environment-webworker",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "webworkerExt.mjs"
								},
								{
									"type": "file",
									"name": "WebWorkerAdapter.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "webworkerAll.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "maths",
							"folders": [
								{
									"type": "folder",
									"name": "matrix",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "groupD8.mjs"
										},
										{
											"type": "file",
											"name": "Matrix.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "shapes",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "RoundedRectangle.mjs"
										},
										{
											"type": "file",
											"name": "Ellipse.mjs"
										},
										{
											"type": "file",
											"name": "ShapePrimitive.mjs"
										},
										{
											"type": "file",
											"name": "Triangle.mjs"
										},
										{
											"type": "file",
											"name": "Polygon.mjs"
										},
										{
											"type": "file",
											"name": "Rectangle.mjs"
										},
										{
											"type": "file",
											"name": "Circle.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "point",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "pointInTriangle.mjs"
										},
										{
											"type": "file",
											"name": "PointLike.mjs"
										},
										{
											"type": "file",
											"name": "ObservablePoint.mjs"
										},
										{
											"type": "file",
											"name": "PointData.mjs"
										},
										{
											"type": "file",
											"name": "Point.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "misc",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "pow2.mjs"
										},
										{
											"type": "file",
											"name": "const.mjs"
										},
										{
											"type": "file",
											"name": "Size.mjs"
										},
										{
											"type": "file",
											"name": "squaredDistanceToLineSegment.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "ticker",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "TickerListener.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "const.mjs"
								},
								{
									"type": "file",
									"name": "Ticker.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "extensions",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "Extensions.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "math-extras",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "rectangleExtras.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "pointExtras.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "utils",
							"folders": [
								{
									"type": "folder",
									"name": "global",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "globalHooks.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "logging",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "warn.mjs"
										},
										{
											"type": "file",
											"name": "deprecation.mjs"
										},
										{
											"type": "file",
											"name": "logScene.mjs"
										},
										{
											"type": "file",
											"name": "logDebugTexture.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "pool",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "PoolGroup.mjs"
										},
										{
											"type": "file",
											"name": "Pool.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "data",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "updateQuadBounds.mjs"
										},
										{
											"type": "file",
											"name": "clean.mjs"
										},
										{
											"type": "file",
											"name": "uid.mjs"
										},
										{
											"type": "file",
											"name": "removeItems.mjs"
										},
										{
											"type": "file",
											"name": "ViewableBuffer.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "browser",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "detectVideoAlphaMode.mjs"
										},
										{
											"type": "file",
											"name": "isWebGLSupported.mjs"
										},
										{
											"type": "file",
											"name": "isSafari.mjs"
										},
										{
											"type": "file",
											"name": "isWebGPUSupported.mjs"
										},
										{
											"type": "file",
											"name": "unsafeEvalSupported.mjs"
										},
										{
											"type": "file",
											"name": "isMobile.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "canvas",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "getCanvasBoundingBox.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "network",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "getResolutionOfUrl.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "misc",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "NOOP.mjs"
										},
										{
											"type": "file",
											"name": "Transform.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "types.mjs"
								},
								{
									"type": "file",
									"name": "utils.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "const.mjs"
								},
								{
									"type": "file",
									"name": "sayHello.mjs"
								},
								{
									"type": "file",
									"name": "path.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "unsafe-eval",
							"folders": [
								{
									"type": "folder",
									"name": "particle",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "generateParticleUpdatePolyfill.mjs"
										},
										{
											"type": "file",
											"name": "particleUpdateFunctions.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "shader",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "generateShaderSyncPolyfill.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "uniforms",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "generateUniformsSyncPolyfill.mjs"
										},
										{
											"type": "file",
											"name": "uniformSyncFunctions.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "ubo",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "uboSyncFunctions.mjs"
										},
										{
											"type": "file",
											"name": "generateUboSyncPolyfill.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "init.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "compressed-textures",
							"folders": [
								{
									"type": "folder",
									"name": "basis",
									"folders": [
										{
											"type": "folder",
											"name": "worker",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "loadBasisOnWorker.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "createLevelBuffers.mjs"
												},
												{
													"type": "file",
													"name": "gpuFormatToBasisTranscoderFormat.mjs"
												},
												{
													"type": "file",
													"name": "setBasisTranscoderPath.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "types.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "loadBasis.mjs"
										},
										{
											"type": "file",
											"name": "detectBasis.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "ktx2",
									"folders": [
										{
											"type": "folder",
											"name": "worker",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "loadKTX2onWorker.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "utils",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "getTextureFormatFromKTXTexture.mjs"
												},
												{
													"type": "file",
													"name": "vkFormatToGPUFormat.mjs"
												},
												{
													"type": "file",
													"name": "setKTXTranscoderPath.mjs"
												},
												{
													"type": "file",
													"name": "convertFormatIfRequired.mjs"
												},
												{
													"type": "file",
													"name": "gpuFormatToKTXBasisTranscoderFormat.mjs"
												},
												{
													"type": "file",
													"name": "glFormatToGPUFormat.mjs"
												},
												{
													"type": "file",
													"name": "createLevelBuffersFromKTX.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "types.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "loadKTX2.mjs"
										},
										{
											"type": "file",
											"name": "const.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "dds",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "parseDDS.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "loadDDS.mjs"
										},
										{
											"type": "file",
											"name": "const.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "shared",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "resolveCompressedTextureUrl.mjs"
										},
										{
											"type": "file",
											"name": "detectCompressed.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "ktx",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "loadKTX.mjs"
										},
										{
											"type": "file",
											"name": "init.mjs"
										},
										{
											"type": "file",
											"name": "parseKTX.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "color",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "Color.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "_virtual",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "loadImageBitmap.worker.mjs"
								},
								{
									"type": "file",
									"name": "basis.worker.mjs"
								},
								{
									"type": "file",
									"name": "checkImageBitmap.worker.mjs"
								},
								{
									"type": "file",
									"name": "ktx.worker.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "prepare",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "PrepareBase.mjs"
								},
								{
									"type": "file",
									"name": "PrepareUpload.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "PrepareSystem.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "PrepareQueue.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "app",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "Application.md"
								},
								{
									"type": "file",
									"name": "ResizePlugin.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "Application.mjs"
								},
								{
									"type": "file",
									"name": "TickerPlugin.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "environment-browser",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "browserExt.mjs"
								},
								{
									"type": "file",
									"name": "BrowserAdapter.mjs"
								},
								{
									"type": "file",
									"name": "_environment-browser.md"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "browserAll.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "culling",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "CullerPlugin.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "Culler.mjs"
								},
								{
									"type": "file",
									"name": "cullingMixin.mjs"
								}
							]
						},
						{
							"type": "folder",
							"name": "filters",
							"folders": [
								{
									"type": "folder",
									"name": "mask",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "mask.frag.mjs"
										},
										{
											"type": "file",
											"name": "MaskFilter.mjs"
										},
										{
											"type": "file",
											"name": "mask.vert.mjs"
										},
										{
											"type": "file",
											"name": "mask.wgsl.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "defaults",
									"folders": [
										{
											"type": "folder",
											"name": "alpha",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "alpha.wgsl.mjs"
												},
												{
													"type": "file",
													"name": "AlphaFilter.mjs"
												},
												{
													"type": "file",
													"name": "alpha.frag.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "noise",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "noise.frag.mjs"
												},
												{
													"type": "file",
													"name": "noise.wgsl.mjs"
												},
												{
													"type": "file",
													"name": "NoiseFilter.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "blur",
											"folders": [
												{
													"type": "folder",
													"name": "gl",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "generateBlurFragSource.mjs"
														},
														{
															"type": "file",
															"name": "generateBlurGlProgram.mjs"
														},
														{
															"type": "file",
															"name": "generateBlurVertSource.mjs"
														}
													]
												},
												{
													"type": "folder",
													"name": "gpu",
													"folders": [],
													"files": [
														{
															"type": "file",
															"name": "generateBlurProgram.mjs"
														},
														{
															"type": "file",
															"name": "blur-template.wgsl.mjs"
														}
													]
												}
											],
											"files": [
												{
													"type": "file",
													"name": "BlurFilter.mjs"
												},
												{
													"type": "file",
													"name": "BlurFilterPass.mjs"
												},
												{
													"type": "file",
													"name": "const.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "displacement",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "displacement.frag.mjs"
												},
												{
													"type": "file",
													"name": "DisplacementFilter.mjs"
												},
												{
													"type": "file",
													"name": "displacement.wgsl.mjs"
												},
												{
													"type": "file",
													"name": "displacement.vert.mjs"
												}
											]
										},
										{
											"type": "folder",
											"name": "color-matrix",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "colorMatrixFilter.wgsl.mjs"
												},
												{
													"type": "file",
													"name": "ColorMatrixFilter.mjs"
												},
												{
													"type": "file",
													"name": "colorMatrixFilter.frag.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "defaultFilter.vert.mjs"
										}
									]
								},
								{
									"type": "folder",
									"name": "blend-modes",
									"folders": [
										{
											"type": "folder",
											"name": "hls",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "GPUhls.mjs"
												},
												{
													"type": "file",
													"name": "GLhls.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "blend-template.frag.mjs"
										},
										{
											"type": "file",
											"name": "hsl.wgsl.mjs"
										},
										{
											"type": "file",
											"name": "blend-template.vert.mjs"
										},
										{
											"type": "file",
											"name": "BlendModeFilter.mjs"
										},
										{
											"type": "file",
											"name": "blend-template.wgsl.mjs"
										}
									]
								}
							],
							"files": [
								{
									"type": "file",
									"name": "Filter.mjs"
								},
								{
									"type": "file",
									"name": "init.mjs"
								},
								{
									"type": "file",
									"name": "index.mjs"
								},
								{
									"type": "file",
									"name": "FilterSystem.mjs"
								},
								{
									"type": "file",
									"name": "FilterPipe.mjs"
								},
								{
									"type": "file",
									"name": "FilterEffect.mjs"
								}
							]
						}
					],
					"files": [
						{
							"type": "file",
							"name": "index.mjs"
						}
					]
				},
				{
					"type": "folder",
					"name": "libs",
					"folders": [
						{
							"type": "folder",
							"name": "@pixi",
							"folders": [
								{
									"type": "folder",
									"name": "colord",
									"folders": [
										{
											"type": "folder",
											"name": "plugins",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "minify.mjs"
												},
												{
													"type": "file",
													"name": "harmonies.mjs"
												},
												{
													"type": "file",
													"name": "hwb.mjs"
												},
												{
													"type": "file",
													"name": "mix.mjs"
												},
												{
													"type": "file",
													"name": "lch.mjs"
												},
												{
													"type": "file",
													"name": "lab.mjs"
												},
												{
													"type": "file",
													"name": "xyz.mjs"
												},
												{
													"type": "file",
													"name": "names.mjs"
												},
												{
													"type": "file",
													"name": "a11y.mjs"
												},
												{
													"type": "file",
													"name": "cmyk.mjs"
												}
											]
										}
									],
									"files": [
										{
											"type": "file",
											"name": "index.mjs"
										}
									]
								}
							],
							"files": []
						},
						{
							"type": "folder",
							"name": "eventemitter3",
							"folders": [
								{
									"type": "folder",
									"name": "dist",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "eventemitter3.esm.js"
										}
									]
								}
							],
							"files": []
						},
						{
							"type": "folder",
							"name": "ismobilejs",
							"folders": [
								{
									"type": "folder",
									"name": "esm",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "isMobile.js"
										}
									]
								}
							],
							"files": []
						},
						{
							"type": "folder",
							"name": "@xmldom",
							"folders": [
								{
									"type": "folder",
									"name": "xmldom",
									"folders": [
										{
											"type": "folder",
											"name": "lib",
											"folders": [],
											"files": [
												{
													"type": "file",
													"name": "sax.js"
												},
												{
													"type": "file",
													"name": "dom-parser.js"
												},
												{
													"type": "file",
													"name": "index.js"
												},
												{
													"type": "file",
													"name": "entities.js"
												},
												{
													"type": "file",
													"name": "dom.js"
												},
												{
													"type": "file",
													"name": "conventions.js"
												}
											]
										}
									],
									"files": []
								}
							],
							"files": []
						},
						{
							"type": "folder",
							"name": "earcut",
							"folders": [
								{
									"type": "folder",
									"name": "src",
									"folders": [],
									"files": [
										{
											"type": "file",
											"name": "earcut.js"
										}
									]
								}
							],
							"files": []
						},
						{
							"type": "folder",
							"name": "parse-svg-path",
							"folders": [],
							"files": [
								{
									"type": "file",
									"name": "index.js"
								}
							]
						}
					],
					"files": []
				}
			],
			"files": []
		}
	]
};