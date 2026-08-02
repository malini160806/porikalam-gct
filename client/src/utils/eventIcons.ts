/** Maps the semantic icon keys used in event data to the custom heritage icon set. */
const EVENT_ICON_IMAGE: Record<string, string> = {
  'pen-tool': 'clipboard.png',
  'hard-hat': 'team-people.png',
  landmark: 'house.png',
  'message-square-text': 'lightbulb-rays.png',
  presentation: 'trophy.png',
  'brain-cog': 'lightbulb-heart.png',
  search: 'map-pin.png',
  bot: 'robotic-arm.png',
  plane: 'leaf-pair.png',
  rocket: 'download-arrow.png',
  cog: 'gear.png',
  'circuit-board': 'circuit-abstract.jpg',
  factory: 'microchip.jpg',
  bug: 'phone-call.png',
  'clipboard-list': 'clipboard.png',
  'brain-circuit': 'ai-chip.jpg',
};

export function getEventIconSrc(iconKey: string): string {
  return `/icons/events/${EVENT_ICON_IMAGE[iconKey] ?? 'gear.png'}`;
}
