const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "rol-ver",
    description: 'Birine Rol Verirsin!',
    type: 1,
    options: [
        {
            name: "user",
            description: "Rolü verilecek kullanıcıyı seçin!",
            type: 6,
            required: true
        },
        {
            name: "rol",
            description: "Lütfen bir rol etiketle!",
            type: 8,
            required: true
        },
    ],
    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({ content: "❌ | Rolleri Yönet Yetkin Yok!", ephemeral: true });
        }

        const rol = interaction.options.getRole('rol');
        const user = interaction.options.getMember('user');

        const botRole = interaction.guild.members.cache.get(client.user.id).roles.highest;
        const targetRole = rol;
        const targetMember = interaction.guild.members.cache.get(user.id);

        if (targetRole.position >= botRole.position) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("❌ | Bunu yapmak için rolüm yetersiz, rolümü daha yukarı taşır mısın 👉👈 🥺");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            await targetMember.roles.add(targetRole);
            const embed = new EmbedBuilder()
                .setColor("Random")
                .setDescription(`✅ | Başarıyla ${user} Kullanıcısına ${rol.name} Rolü Verildi!`);

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Rol verme sırasında bir hata oluştu:', error);
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("❌ | Rol verme sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};