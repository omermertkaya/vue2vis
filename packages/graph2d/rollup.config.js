import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { terser } from "rollup-plugin-terser";
import vue from "rollup-plugin-vue";

export default [
  {
    input: "./lib/index.js",
    output: [
      {
        format: "esm",
        sourcemap: true,
        file: "dist/graph2d.esm.min.js",
      },
      {
        name: "vis",
        extend: true,
        exports: "named",
        sourcemap: true,
        format: "umd",
        file: "dist/graph2d.umd.min.js",
      },
    ],
    plugins: [
      vue(),
      externals({
        exclude: [
          "component-emitter",
          "propagating-hammerjs",
          "@egjs/hammerjs",
          "keycharm",
          "uuid",
        ],
      }),
      nodePolyfills(),
      resolve({ browser: true }),
      commonjs({
        namedExports: {
          uuid: ["v4"],
        },
      }),
      terser({
        output: {
          comments: "some",
        },
      }),
    ],
  },
];
