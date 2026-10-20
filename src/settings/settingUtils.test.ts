import { describe, it, expect } from 'vitest';
import { resolveSettings } from './settingUtils';
import defaultSettings from './defaultSettings';

describe('resolveSettings', () => {
  it('should return same settings with missing properties filled in as defaults', () => {
    const partialSettings = {
      "ten-to-zero": false,
      "use-custom-background": true,
      "custom-background-path": "/path/to/background.jpg"
    };

    const result = resolveSettings(partialSettings);

    expect(result['ten-to-zero']).toEqual(false)
    expect(result['use-custom-background']).toEqual(true)
    expect(result['custom-background-path']).toEqual("/path/to/background.jpg")
    expect(result['notify-for-updates']).toEqual(true)
  });

  it('should ignore extra unnecessary properties and return default settings with known properties', () => {
    const settingsWithExtra = {
      "ten-to-zero": true,
      "use-custom-background": false,
      "custom-background-path": "/path/to/background.jpg",
      "extra-property": "should-be-ignored",
      "another-extra": 123
    };

    const result = resolveSettings(settingsWithExtra);

    expect(result).not.toHaveProperty("extra-property");
    expect(result).not.toHaveProperty("another-extra");
  });

  it('should handle empty object by returning default settings', () => {
    const emptySettings = {};

    const result = resolveSettings(emptySettings);

    expect(result).toEqual(defaultSettings);
  });

  it('should handle undefined values by using defaults', () => {
    const settingsWithUndefined = {
      "ten-to-zero": undefined,
      "use-custom-background": true,
      "custom-background-path": undefined
    };

    const result = resolveSettings(settingsWithUndefined);

    expect(result['ten-to-zero']).toEqual(true)
    expect(result['use-custom-background']).toEqual(true)
    expect(result['custom-background-path']).toEqual("")
    expect(result['notify-for-updates']).toEqual(true)
  });
});
