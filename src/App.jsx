import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Range } from "immutable";
import THREE from "three";

import * as configUtil from "./config/configUtil";
import WebGLRenderer from "./components/WebGLRenderer";
import TextRenderer from "./components/TextRenderer";
import Controls from "./components/Controls";
import Score from "./components/Score";

export default class App extends Component {
    render() {
        let snakeRenderers = [];

        console.log("App", this.props);

        if (configUtil.isRendererEnabled("webgl")) {
            snakeRenderers.push(<WebGLRenderer {...this.props} />);
        }

        if (configUtil.isRendererEnabled("text")) {
            snakeRenderers.push(<TextRenderer
                foodPosition={this.props.foodPosition}
                gridSize={this.props.gridSize}
                snakeBody={this.props.snakeBody}
                players={this.props.players}
            />);
        }

        return (
            <div>
                {snakeRenderers}
                <Controls />
            </div>
        );
                // <Score points={this.props.score} />
    }
}

function selectStateParts(state) {
    return {
        direction: state.get("direction"),
        speed: state.get("speed"),
        snakeBody: state.get("snakeBody"),
        foodPosition: state.get("foodPosition"),
        score: state.get("score"),
        gridSize: state.get("gridSize"),
        isGamePaused: state.get("isGamePaused"),
        isGameStarted: state.get("isGameStarted"),
        cameraOffsetZ: state.get("cameraOffsetZ"),
        players: state.get("players")
    };
}

export default connect(selectStateParts)(App);
