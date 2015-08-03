var Fluxxor = require('fluxxor');
var React = require('react');

module.exports = {
    getInitialState: function() {
        return {
            showVolumeOptions: false
        };
    },
    getPlayer: function() {
        if(this.state && this.state.player) {
            return this.state.player;
        } else {
            return this.props.player;
        }
    },
    onKeyDown: function(e) {
        if(e.keyCode === 32) {
            this.onPlayButtonClick();
            e.preventDefault();
        } else if(e.keyCode === 39) {
            this.onNextButtonClick();
            e.preventDefault();
        } else if(e.keyCode === 37) {
            this.onPreviousButtonClick();
            e.preventDefault();
        }
    },
    onNextButtonClick: function() {
        this.getFlux().actions.player.nextTrack(this.getPlayer().get('id'));
    },
    onPlayButtonClick: function() {
        this.getFlux().actions.player.track.togglePause(this.getPlayer().get('nowPlaying').toJS());
    },
    onPreviousButtonClick: function() {
        var player = this.getPlayer();

        if(player.getIn(['nowPlaying', 'playbackPosition']) < 4000) {
            this.getFlux().actions.player.previousTrack(player.get('id'));
        } else {
            this.getFlux().actions.player.track.seekTo(player.get('nowPlaying').toJS(), 0);
        }
    },
    onRepeatClick: function() {
        this.getFlux().actions.player.setRepeat(!this.props.repeat);
    },
    onSetVolumeClick: function(volume) {
        this.setState({
            showVolumeOptions: false
        });
        this.getFlux().actions.player.setVolume(volume);
    },
    onShowVolumeControlsClick: function() {
        this.setState({
            showVolumeOptions: true
        });
    }
};
