import assert from "assert";
import espree from "espree";
import evk from "eslint-visitor-keys";
import { analyze } from "../lib/index.js";

const { KEYS } = evk;

describe("export * as ns from 'source'", () => {
    let scopes;

    beforeEach(() => {
        const ast = espree.parse("export * as ns from 'source'", {
            ecmaVersion: 2020,
            sourceType: "module"
        });
        const manager = analyze(ast, {
            ecmaVersion: 11,
            sourceType: "module",
            childVisitorKeys: KEYS
        });

        scopes = [manager.globalScope, ...manager.globalScope.childScopes];
    });

    it("should not have any references", () => {
        for (const scope of scopes) {
            assert.strictEqual(scope.references.length, 0, scope.type);
            assert.strictEqual(scope.through.length, 0, scope.type);
        }
    });

    it("should not have any variables", () => {
        for (const scope of scopes) {
            assert.strictEqual(scope.variables.length, 0, scope.type);
        }
    });
});
