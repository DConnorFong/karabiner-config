import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell, createRightOptionSubLayers } from "./utils";

const rules: KarabinerRules[] = [
  {
    // Trigger a secondary layer on MacBook (HYPER) for shortcuts
    description: "MacBook Function Layer Trigger",
    manipulators: [
      {
        description: "Right Option -> Hyper",
        from: {
          key_code: "right_option",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        conditions: [
          {
            description: "Only trigger this rule when we are using the built in keyboard",
            type: "device_if",
            identifiers: [
              {
                is_built_in_keyboard: true,
              }
            ]
          },
          {
            description: "Only trigger this rule when we are Kinesis Freestyle",
            type: "device_if",
            identifiers: [
              {
                is_game_pad: true,
                is_keyboard: true,
                is_pointing_device: true,
                vendor_id: 10730,
                product_id: 32778,
              }
            ]
          },

        ],
        type: "basic",
      },
    ]
  },
  // Emulate VIA firmware macros, need not be used outside of built-in keyboard
  ...createHyperSubLayers(
    {
      // Media
      spacebar: {
        to: [
          {
            key_code: "play_or_pause"
          }
        ]
      },
      up_arrow: {
        to: [
          {
            key_code: "volume_increment"
          }
        ]
      },
      down_arrow: {
        to: [
          {
            key_code: "volume_decrement"
          }
        ]
      },
      left_arrow: {
        to: [
          {
            key_code: "rewind"
          }
        ]
      },
      right_arrow: {
        to: [
          {
            key_code: "fastforward"
          }
        ]
      },
      // VIM Arrows
      h: {
        to: [
          {
            key_code: "left_arrow"
          }
        ]
      },
      j: {
        to: [
          {
            key_code: "down_arrow"
          }
        ]
      },
      k: {
        to: [
          {
            key_code: "up_arrow"
          }
        ]
      },
      l: {
        to: [
          {
            key_code: "right_arrow"
          }
        ]
      },
      // F Row
      1: {
        to: [
          {
            key_code: "f1"
          }
        ]
      },
      2: {
        to: [
          {
            key_code: "f2"
          }
        ]
      },
      3: {
        to: [
          {
            key_code: "f3"
          }
        ]
      },
      4: {
        to: [
          {
            key_code: "f4"
          }
        ]
      },
      5: {
        to: [
          {
            key_code: "f5"
          }
        ]
      },
      6: {
        to: [
          {
            key_code: "f6"
          }
        ]
      },
      7: {
        to: [
          {
            key_code: "f7"
          }
        ]
      },
      8: {
        to: [
          {
            key_code: "f8"
          }
        ]
      },
      9: {
        to: [
          {
            key_code: "f9"
          }
        ]
      },
      0: {
        to: [
          {
            key_code: "f10"
          }
        ]
      },
      hyphen: {
        to: [
          {
            key_code: "f11"
          }
        ]
      },
      equal_sign: {
        to: [
          {
            key_code: "f12"
          }
        ]
      },
    }
  ),
  // ...createHyperSubLayers(
  //   {
  //   spacebar: open(
  //     "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
  //   ),
  //   // b = "B"rowse
  //   b: {
  //     t: open("https://twitter.com"),
  //     // Quarterly "P"lan
  //     p: open("https://qrtr.ly/plan"),
  //     y: open("https://news.ycombinator.com"),
  //     f: open("https://facebook.com"),
  //     r: open("https://reddit.com"),
  //   },
  //   // (O)pen application
  //   o: {
  //     c: app("Google Chrome"),
  //     i: app("IntelliJ IDEA"),
  //     w: app("WebStorm"),
  //     d: app("DataGrip"),
  //     s: app("Slack"),
  //     // Mail/Outlook
  //     m: app("Microsoft Outlook"),
  //     n: app("Obsidian"),
  //     p: app("Spotify"),
  //     c: app("Notion Calendar")
  //     v: app("Visual Studio Code"),
  //     d: app("Discord"),
  //     s: app("Slack"),
  //     e: app("Superhuman"),
  //     n: app("Notion"),
  //     t: app("Terminal"),
  //     // Open todo list managed via *H*ypersonic
  //     h: open(
  //       "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"
  //     ),
  //     z: app("zoom.us"),
  //     // "M"arkdown (Obsidian.md)
  //     m: app("Obsidian"),
  //     f: app("Finder"),
  //     r: app("Texts"),
  //     // "i"Message
  //     i: app("Texts"),
  //     p: app("Spotify"),
  //     a: app("iA Presenter"),
  //     // "W"hatsApp has been replaced by Texts
  //     w: open("Texts"),
  //     l: open(
  //       "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
  //     ),
  //   },
  //
  //   // w = "Window" via rectangle.app
  //   w: {
  //     semicolon: {
  //       description: "Window: Hide",
  //       to: [
  //         {
  //           key_code: "h",
  //           modifiers: ["right_command"],
  //         },
  //       ],
  //     },
  //     y: rectangle("previous-display"),
  //     o: rectangle("next-display"),
  //     k: rectangle("top-half"),
  //     j: rectangle("bottom-half"),
  //     h: rectangle("left-half"),
  //     l: rectangle("right-half"),
  //     f: rectangle("maximize"),
  //     u: {
  //       description: "Window: Previous Tab",
  //       to: [
  //         {
  //           key_code: "tab",
  //           modifiers: ["right_control", "right_shift"],
  //         },
  //       ],
  //     },
  //     i: {
  //       description: "Window: Next Tab",
  //       to: [
  //         {
  //           key_code: "tab",
  //           modifiers: ["right_control"],
  //         },
  //       ],
  //     },
  //     n: {
  //       description: "Window: Next Window",
  //       to: [
  //         {
  //           key_code: "grave_accent_and_tilde",
  //           modifiers: ["right_command"],
  //         },
  //       ],
  //     },
  //     b: {
  //       description: "Window: Back",
  //       to: [
  //         {
  //           key_code: "open_bracket",
  //           modifiers: ["right_command"],
  //         },
  //       ],
  //     },
  //     // Note: No literal connection. Both f and n are already taken.
  //     m: {
  //       description: "Window: Forward",
  //       to: [
  //         {
  //           key_code: "close_bracket",
  //           modifiers: ["right_command"],
  //         },
  //       ],
  //     },
  //     d: {
  //       description: "Window: Next display",
  //       to: [
  //         {
  //           key_code: "right_arrow",
  //           modifiers: ["right_control", "right_option", "right_command"],
  //         },
  //       ],
  //     },
  //   },
  //
  //   // s = "System"
  //   s: {
  //     u: {
  //       to: [
  //         {
  //           key_code: "volume_increment",
  //         },
  //       ],
  //     },
  //     j: {
  //       to: [
  //         {
  //           key_code: "volume_decrement",
  //         },
  //       ],
  //     },
  //     i: {
  //       to: [
  //         {
  //           key_code: "display_brightness_increment",
  //         },
  //       ],
  //     },
  //     k: {
  //       to: [
  //         {
  //           key_code: "display_brightness_decrement",
  //         },
  //       ],
  //     },
  //     l: {
  //       to: [
  //         {
  //           key_code: "q",
  //           modifiers: ["right_control", "right_command"],
  //         },
  //       ],
  //     },
  //     p: {
  //       to: [
  //         {
  //           key_code: "play_or_pause",
  //         },
  //       ],
  //     },
  //     semicolon: {
  //       to: [
  //         {
  //           key_code: "fastforward",
  //         },
  //       ],
  //     },
  //     e: open(
  //       `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
  //     ),
  //     // "D"o not disturb toggle
  //     d: open(
  //       `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
  //     ),
  //     // "T"heme
  //     t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
  //     c: open("raycast://extensions/raycast/system/open-camera"),
  //   },
  //
  //   // v = "moVe" which isn't "m" because we want it to be on the left hand
  //   // so that hjkl work like they do in vim
  //   v: {
  //     h: {
  //       to: [{ key_code: "left_arrow" }],
  //     },
  //     j: {
  //       to: [{ key_code: "down_arrow" }],
  //     },
  //     k: {
  //       to: [{ key_code: "up_arrow" }],
  //     },
  //     l: {
  //       to: [{ key_code: "right_arrow" }],
  //     },
  //     // Magicmove via homerow.app
  //     m: {
  //       to: [{ key_code: "f", modifiers: ["right_control"] }],
  //       // TODO: Trigger Vim Easymotion when VSCode is focused
  //     },
  //     // Scroll mode via homerow.app
  //     s: {
  //       to: [{ key_code: "j", modifiers: ["right_control"] }],
  //     },
  //     d: {
  //       to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
  //     },
  //     u: {
  //       to: [{ key_code: "page_down" }],
  //     },
  //     i: {
  //       to: [{ key_code: "page_up" }],
  //     },
  //   },
  //
  //   // c = Musi*c* which isn't "m" because we want it to be on the left hand
  //   c: {
  //     p: {
  //       to: [{ key_code: "play_or_pause" }],
  //     },
  //     n: {
  //       to: [{ key_code: "fastforward" }],
  //     },
  //     b: {
  //       to: [{ key_code: "rewind" }],
  //     },
  //   },
  //
  // }),
  {
    description: "Change CAPS_LOCK, ideally mapped to RIGHT_COMMAND in VIA to LEFT_CONTROL when Terminal (Kitty) is focused",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "right_command",
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        conditions: [
          {
            type: "frontmost_application_if",
            bundle_identifiers: [
              "^net\\.kovidgoyal\\.kitty$",
              "^com\\.apple\\.Terminal$"
            ],
          },
        ],
      },
    ],
  },
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
          // TODO: actually implement this, and carry over details to types
          devices: [
            // Emulate what VIA does to my other keyboards, by swapping to consistent mappings.
            //  Note that when Karabiner is used, System Preferences remaps are actually ignored.
            //  The virtual keyboard intercepts directly from hardware input.
            {
              identifiers: {
                is_keyboard: true,
                is_built_in_keyboard: true
              },
              simple_modifications: [
                {
                  from: { "key_code": "caps_lock" },
                  to: [{ "key_code": "right_command" }]
                },
                {
                  from: { "apple_vendor_top_case_key_code": "keyboard_fn" },
                  to: [{ "key_code": "left_control" }]
                },
                {
                  from: { "key_code": "left_control" },
                  to: [{ "key_code": "left_command" }]
                },
                {
                  from: { "key_code": "left_command" },
                  // Notice RIGHT_OPTION, left option on the MacBook is still the same
                  //  I am going to use these remaps for F row and other shortcuts
                  to: [{ "key_code": "right_option" }]
                }
              ]
            },
            // TODO: fix duplicate code block with function
            {
              identifiers: {
                is_game_pad: true,
                is_keyboard: true,
                is_pointing_device: true,
                vendor_id: 10730,
                product_id: 32778,
              },
              ignore: false,
              simple_modifications: [
                {
                  from: { "key_code": "caps_lock" },
                  to: [{ "key_code": "right_command" }]
                },
                {
                  from: { "key_code": "left_option" },
                  // Notice RIGHT_OPTION, left option on the MacBook is still the same
                  //  I am going to use these remaps for F row and other shortcuts
                  to: [{ "key_code": "right_option" }]
                }
              ]
            },

          ]
        },
      ],
    },
    null,
    2
  )
);
