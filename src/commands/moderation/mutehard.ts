import { Command } from '../../structs/types/commands'
import {
	ApplicationCommandOptionType,
	ChannelType,
	EmbedBuilder,
	GuildMember,
	GuildMemberRoleManager,
	PermissionFlagsBits,
	Role,
} from 'discord.js'
import { client } from '@src/index'

type IGuildMember = Pick<GuildMember, 'roles'> &
	GuildMemberRoleManager & {
		highest: Role
	}

export default new Command({
	name: 'mutehard',
	description: 'mutar um usuário',
	defaultMemberPermissions: ['ModerateMembers'],
	options: [
		{
			name: 'user',
			description: 'usuário que será mutado',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'reason',
			description: 'razão pela qual o usuário ficará mutado',
			type: ApplicationCommandOptionType.String,
		},
	],
	async run({ interaction, options }) {
		const user = options.getUser('user', true)
		const member = await interaction.guild?.members.fetch(user!.id)
		const reason = options.getString('reason')

		const successEmbed = new EmbedBuilder()
			.setTitle(`**✅ Mutado**`)
			.setDescription(`Usuário mutado ${user}`)
			.setColor('Green')
			.addFields({ name: 'Razão', value: `${reason}`, inline: true })
			.setTimestamp()

		const authorRoles = interaction.member?.roles as IGuildMember

		if (member!.roles.highest.position >= authorRoles.highest.position) {
			return interaction.reply({
				content:
					'Você não pode mutar um membro com cargo igual ou superior ao seu.',
				ephemeral: true,
			})
		}

		if (
			!interaction.guild?.members.me?.permissions.has(
				PermissionFlagsBits.ModerateMembers,
			)
		) {
			return interaction.reply({
				content: 'Você não possui permissão para mutar alguém.',
				ephemeral: true,
			})
		}

		try {
			let mutedRole = interaction.guild.roles.cache.find(
				(role) => role.name == 'Muted',
			)
			const botName = interaction.guild.roles.cache.find(
				(role) => role.name == client.user?.username,
			)
			if (!mutedRole) {
				mutedRole = await interaction.guild?.roles.create({
					name: 'Muted',
					color: 'Grey',
					permissions: ['SendMessages', 'Connect'],
				})
			}
			if (botName) await mutedRole.setPosition(botName?.position - 1)
			await member?.roles.add(mutedRole)

			if (mutedRole) {
				interaction.guild.channels.cache.forEach((channel) => {
					if (channel.type == ChannelType.GuildText) {
						channel.permissionOverwrites.create(mutedRole!, {
							SendMessages: false,
						})
					}
					if (channel.type == ChannelType.GuildVoice) {
						channel.permissionOverwrites.create(mutedRole!, {
							Connect: false,
						})
					}
				})
			}

			const msg = await interaction.reply({
				embeds: [successEmbed],
			})
			setTimeout(() => {
				msg.delete()
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	},
})
