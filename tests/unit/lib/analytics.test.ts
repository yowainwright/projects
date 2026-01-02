import { describe, test, expect, mock, beforeEach } from 'bun:test';

const mockPosthog = {
  init: mock(() => {}),
  capture: mock(() => {}),
  identify: mock(() => {}),
  reset: mock(() => {}),
};

mock.module('posthog-js', () => ({ default: mockPosthog }));

describe('analytics', () => {
  beforeEach(() => {
    mockPosthog.init.mockClear();
    mockPosthog.capture.mockClear();
    mockPosthog.identify.mockClear();
    mockPosthog.reset.mockClear();
  });

  test('trackEvent calls posthog.capture', async () => {
    const { trackEvent } = await import('@/lib/analytics');
    trackEvent('test_event', { foo: 'bar' });

    expect(mockPosthog.capture).toHaveBeenCalledWith('test_event', { foo: 'bar' });
  });

  test('identifyUser calls posthog.identify', async () => {
    const { identifyUser } = await import('@/lib/analytics');
    identifyUser('user123', { name: 'Test' });

    expect(mockPosthog.identify).toHaveBeenCalledWith('user123', { name: 'Test' });
  });

  test('resetUser calls posthog.reset', async () => {
    const { resetUser } = await import('@/lib/analytics');
    resetUser();

    expect(mockPosthog.reset).toHaveBeenCalled();
  });
});
