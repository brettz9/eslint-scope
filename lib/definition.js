/*
  Copyright (C) 2015 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import Variable from "./variable.js";

/**
 * @local
 * @typedef {import('acorn')} acorn
 * @typedef {import('estree').Identifier} Identifier
 */

/**
 * @constructor Definition
 */
class Definition {

    /**
     * Creates a scope definition.
     * @param {string} type Type of the occurrence (e.g. "Parameter", "Variable", ...).
     * @param {Identifier} name The identifier AST node of the occurrence.
     * @param {acorn.Node} node The enclosing node of the identifier.
     * @param {acorn.Node?} parent The enclosing statement node of the identifier.
     * @param {number?} index The index in the declaration statement.
     * @param {string?} kind The kind of the declaration statement.
     */
    constructor(type, name, node, parent, index, kind) {
        this.type = type;
        this.name = name;
        this.node = node;
        this.parent = parent;
        this.index = index;
        this.kind = kind;
    }
}

/**
 * @constructor ParameterDefinition
 */
class ParameterDefinition extends Definition {

    /**
     * Creates a definition for a parameter
     * @param {Identifier} name The identifier AST node of the occurrence.
     * @param {acorn.Node} node The enclosing node of the identifier.
     * @param {number?} index The index in the declaration statement.
     * @param {boolean} rest Whether the parameter definition is a part of a rest parameter.
     */
    constructor(name, node, index, rest) {
        super(Variable.Parameter, name, node, null, index, null);

        this.rest = rest;
    }
}

export {
    ParameterDefinition,
    Definition
};

/* vim: set sw=4 ts=4 et tw=80 : */
