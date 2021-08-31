import React from 'react';
import PropTypes from 'prop-types';
import SettingsContent from './SettingsContent';
import StatsContent from './StatsContent';
import InstructionsContent from './InstructionsContent';
import CloseFlyoutButton from './CloseFlyoutButton';

const ContentFlyout = ({displayMode}) => {
    
    return (
        <div id="content-flyout-container">
            <div id="content-flyout-inner-div">
                <CloseFlyoutButton />
                <div className="content-flyout-content">
                    {displayMode === 'settings' ? <SettingsContent /> : ''}
                    {displayMode === 'stats' ? <StatsContent /> : ''}
                    {displayMode === 'instructions' ? <InstructionsContent /> : ''}
                </div>
            </div>
        </div>
    )
}

ContentFlyout.propTypes = {
    displayMode: PropTypes.string.isRequired
}

export default ContentFlyout;
